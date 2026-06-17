'use server'

import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function getActiveSession() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  const { data: existingSession } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'in_progress')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!existingSession) {
    return { session: null, messages: [], isResumed: false };
  }

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content')
    .eq('session_id', existingSession.id)
    .order('created_at', { ascending: true });
    
  return { session: existingSession, messages: messages || [], isResumed: true };
}

export async function createNewSession(role: string, difficulty: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  if (!user) {
    const clerkUser = await currentUser();
    const primaryEmail = clerkUser?.emailAddresses[0]?.emailAddress || 'unknown@example.com';
    const { data: newUser, error: userErr } = await supabase.from('users').insert({
      id: userId,
      email: primaryEmail,
    }).select().single();
    if (userErr) throw new Error(`Fallback creation failed: ${userErr.message}`);
    user = newUser;
  }
  
  if (user?.plan === 'free' && (user?.sessions_used || 0) >= 3) {
    throw new Error('LIMIT_REACHED');
  }

  // End any currently active sessions before starting a new one
  await supabase.from('sessions').update({ status: 'completed' })
    .eq('user_id', userId)
    .eq('status', 'in_progress');
  
  const { data: session, error } = await supabase.from('sessions').insert({
    user_id: userId,
    role: role || user?.target_role || 'Software Engineer',
    difficulty: difficulty || 'mid',
    resume_text: user?.resume_text || '',
    status: 'in_progress'
  }).select().single();
  
  if (error || !session) throw new Error('Failed to create session');
  
  return session;
}

export async function endSessionEarly(sessionId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  await supabase.from('sessions').update({
    status: 'completed',
    ended_at: new Date().toISOString()
  }).eq('id', sessionId);
  
  const { data: userData } = await supabase.from('users').select('sessions_used').eq('id', userId).single();
  await supabase.from('users').update({
    sessions_used: (userData?.sessions_used || 0) + 1
  }).eq('id', userId);
}

export async function logViolation(sessionId: string, type: 'tab' | 'face') {
  const column = type === 'tab' ? 'tab_violations' : 'face_violations';
  
  // Fetch current violation count
  const { data: session } = await supabase
    .from('sessions')
    .select(column)
    .eq('id', sessionId)
    .single();
    
  if (session) {
    const currentCount = (session as any)[column] || 0;
    await supabase
      .from('sessions')
      .update({ [column]: currentCount + 1 })
      .eq('id', sessionId);
  }
}

export async function saveCandidateMessage(sessionId: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  await supabase.from('messages').insert({
    session_id: sessionId,
    role: 'candidate',
    content
  });
}

export async function uploadRecording(sessionId: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const { error } = await supabase.storage
    .from('session-recordings')
    .upload(`${sessionId}/recording.webm`, file, {
      contentType: 'video/webm'
    });

  if (error) {
    console.error('Error uploading recording:', error);
    throw new Error('Failed to upload recording');
  }
}
