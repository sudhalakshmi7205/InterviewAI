import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getInterviewerResponse(
  messages: { role: string; content: string }[],
  role: string,
  difficulty: string
) {
  const systemInstruction = `You are a senior interviewer conducting a ${role} interview at ${difficulty} level.
    
Rules:
- Ask one question at a time. Never ask two questions in one message.
- After the candidate answers, ask one follow-up question based specifically on what they said.
- Do not give feedback, hints, or encouragement during the interview.
- Do not repeat questions you have already asked.
- Keep your questions concise and professional.
- After exactly 5 candidate responses, say only this: "That concludes our interview. Thank you for your time."`;

  const contents = messages.map(m => ({
    role: m.role === 'interviewer' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      maxOutputTokens: 500,
    }
  });
  
  return response.text || '';
}

export async function generateFeedbackReport(
  transcript: { role: string; content: string }[],
  role: string
) {
  const formattedTranscript = transcript
    .map(m => `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
    .join('\n\n');
  
  const systemInstruction = `You are an expert interview coach. Evaluate the candidate strictly and honestly.
Return ONLY valid JSON, no other text.`;

  const prompt = `Evaluate this ${role} interview transcript and return a JSON object with this exact structure:

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
${formattedTranscript}`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: 'application/json',
      maxOutputTokens: 2000,
    }
  });
  
  const text = response.text || '{}';
  return JSON.parse(text);
}
