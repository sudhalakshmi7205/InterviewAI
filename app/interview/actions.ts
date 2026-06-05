'use server'

import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function createSession() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  // Get user role and limits
  const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  
  if (user?.plan === 'free' && (user?.sessions_used || 0) >= 3) {
    throw new Error('LIMIT_REACHED');
  }
  
  const { data: session, error } = await supabase.from('sessions').insert({
    user_id: userId,
    role: user?.target_role || 'Software Engineer',
    difficulty: 'mid'
  }).select().single();
  
  if (error) {
    console.error('Supabase error creating session:', error);
    throw new Error(`Supabase error: ${error.message}`);
  }
  if (!session) throw new Error('Failed to create session');
  
  return session;
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
