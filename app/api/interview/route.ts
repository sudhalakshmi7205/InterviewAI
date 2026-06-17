import { getInterviewerResponse } from '@/lib/groq'
import { supabase } from '@/lib/supabase'
import { currentUser } from '@clerk/nextjs/server'

export const maxDuration = 60;

async function isRateLimited(sessionId: string): Promise<boolean> {
  const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
  
  // Count how many messages the user has sent in this session in the last 60 seconds
  const { count } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .eq('role', 'candidate')
    .gte('created_at', oneMinuteAgo);
    
  return (count || 0) >= 10; // Max 10 messages per minute
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { sessionId, messages, role, difficulty, resumeText } = await req.json()

  if (await isRateLimited(sessionId)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const reply = await getInterviewerResponse(messages, role, difficulty, resumeText)
    
    // Save AI message to database
    await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'interviewer',
      content: reply
    })
    
    // Check if interview is over
    const isComplete = reply.includes('That concludes');
    if (isComplete) {
      await supabase.from('sessions').update({
        status: 'completed',
        ended_at: new Date().toISOString()
      }).eq('id', sessionId)
      
      // Increment sessions_used safely
      const { data: userData } = await supabase.from('users').select('sessions_used').eq('id', user.id).single();
      await supabase.from('users').update({
        sessions_used: (userData?.sessions_used || 0) + 1
      }).eq('id', user.id);
    }
    
    return Response.json({ reply, isComplete })
  } catch (err: any) {
    console.error("Claude API Error:", err);
    return Response.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
