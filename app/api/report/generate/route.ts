import { generateFeedbackReport } from '@/lib/claude'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const { sessionId } = await req.json()
  
  // Get all messages for this session
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at')
    
  if (!messages || messages.length === 0) {
    return Response.json({ error: 'No messages found' }, { status: 400 })
  }
  
  // Get session details
  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()
  
  const feedback = await generateFeedbackReport(messages, session.role)
  
  // Save report to database
  const { data: report } = await supabase.from('reports').insert({
    session_id: sessionId,
    overall_score: feedback.overall_score,
    dimension_scores: feedback.dimensions,
    question_feedback: feedback.questions,
    overall_summary: feedback.overall_summary
  }).select().single()
  
  // Update session with scaled score (Dashboard expects out of 100)
  await supabase.from('sessions').update({
    overall_score: feedback.overall_score * 10
  }).eq('id', sessionId)
  
  return Response.json({ report, feedback })
}
