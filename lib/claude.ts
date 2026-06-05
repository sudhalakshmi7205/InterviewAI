import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function getInterviewerResponse(
  messages: { role: string; content: string }[],
  role: string,
  difficulty: string
) {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 500,
    system: `You are a senior interviewer conducting a ${role} interview at ${difficulty} level.
    
Rules:
- Ask one question at a time. Never ask two questions in one message.
- After the candidate answers, ask one follow-up question based specifically on what they said.
- Do not give feedback, hints, or encouragement during the interview.
- Do not repeat questions you have already asked.
- Keep your questions concise and professional.
- After exactly 5 candidate responses, say only this: "That concludes our interview. Thank you for your time."`,
    messages: messages.map(m => ({
      role: m.role === 'interviewer' ? 'assistant' : 'user',
      content: m.content
    }))
  })
  
  return response.content[0].type === 'text' ? response.content[0].text : ''
}

export async function generateFeedbackReport(
  transcript: { role: string; content: string }[],
  role: string
) {
  const formattedTranscript = transcript
    .map(m => `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
    .join('\n\n')
  
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: `You are an expert interview coach. Evaluate the candidate strictly and honestly.
Return ONLY valid JSON, no other text.`,
    messages: [{
      role: 'user',
      content: `Evaluate this ${role} interview transcript and return a JSON object with this exact structure:

{
  "overall_score": <number>, 
  "dimensions": {
    "communication": <number 1-10>,
    "technical_depth": <number 1-10>,
    "structured_thinking": <number 1-10>,
    "relevance": <number 1-10>,
    "confidence": <number 1-10>
  },
  "questions": [
    {
      "question": "<the interviewer's question>",
      "candidate_answer": "<the candidate's answer>",
      "score": <number 1-10>,
      "strength": "<one specific thing they did well>",
      "improvement": "<one specific thing to improve>",
      "ideal_answer": "<what a great answer would have covered>"
    }
  ],
  "overall_summary": "<2-3 sentence overall assessment>"
}
Use a scale of 1-10 for overall_score.

Transcript:
${formattedTranscript}`
    }]
  })
  
  const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
  return JSON.parse(text)
}
