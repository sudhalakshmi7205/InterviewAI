import { getInterviewerResponse } from '@/lib/groq'
import { supabase } from '@/lib/supabase'
import { currentUser } from '@clerk/nextjs/server'

export const maxDuration = 60;

const rateLimitMap = new Map<string, number[]>()

function isRateLimited(userId: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(userId) || []
  const recent = timestamps.filter(t => now - t < 60000) // last 60 seconds
  
  if (recent.length >= 20) return true
  
  rateLimitMap.set(userId, [...recent, now])
  return false
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  if (isRateLimited(user.id)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  const { sessionId, messages, role, difficulty } = await req.json()
  
  try {
    const reply = await getInterviewerResponse(messages, role, difficulty)
    
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
