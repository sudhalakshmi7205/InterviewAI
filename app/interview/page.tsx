'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createSession, saveCandidateMessage, uploadRecording } from './actions'

type Message = { role: string; content: string };

function speakText(text: string) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.95
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
}

function WebcamFeed({ sessionId, isComplete }: { sessionId: string | null, isComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        
        const recorder = new MediaRecorder(stream)
        recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
        recorder.start(1000)
        mediaRecorderRef.current = recorder
      } catch (err) {
        console.error("Camera access denied or unavailable", err)
      }
    }
    
    startCamera()
    
    return () => {
      mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
    }
  }, [])
  
  useEffect(() => {
    if (isComplete && sessionId && mediaRecorderRef.current?.state !== 'inactive') {
      stopAndUpload(sessionId)
    }
  }, [isComplete, sessionId])
  
  async function stopAndUpload(sid: string) {
    mediaRecorderRef.current?.stop()
    
    setTimeout(async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const file = new File([blob], `${sid}.webm`)
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        await uploadRecording(sid, formData)
      } catch (e) {
        console.error("Upload failed", e)
      }
    }, 500)
  }
  
  return (
    <video 
      ref={videoRef} 
      autoPlay 
      muted 
      playsInline
      className="w-32 h-24 md:w-48 md:h-36 rounded-2xl object-cover fixed top-24 right-4 md:right-8 shadow-2xl border-4 border-white z-50"
    />
  )
}

function SpeechInput({ onTranscript, disabled }: { onTranscript: (text: string) => void, disabled: boolean }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)
  
  function startListening() {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.")
      return;
    }
    
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    
    recognition.onresult = (event: any) => {
      const current = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('')
      setTranscript(current)
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    recognition.start()
    recognitionRef.current = recognition
    setIsListening(true)
  }
  
  function stopListening() {
    recognitionRef.current?.stop()
    setIsListening(false)
  }
  
  return (
    <div className="space-y-4 w-full">
      <div className="min-h-24 border border-gray-200 rounded-2xl p-4 bg-gray-50 text-gray-800 text-lg">
        {transcript || <span className="text-gray-400">Your answer will appear here as you speak...</span>}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={isListening ? stopListening : startListening}
          disabled={disabled}
          className={`flex-1 font-bold py-4 rounded-xl transition-colors ${
            isListening 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          } disabled:opacity-50`}
        >
          {isListening ? '🛑 Stop Recording' : '🎤 Start Speaking'}
        </button>
        <button 
          onClick={() => {
            onTranscript(transcript);
            setTranscript('');
          }} 
          disabled={disabled || !transcript.trim()}
          className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
        >
          Submit Answer
        </button>
      </div>
    </div>
  )
}

export default function InterviewPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startSession()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startSession() {
    setIsLoading(true);
    try {
      const newSession = await createSession();
      setSession(newSession);
      
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: newSession.id,
          messages: [],
          role: newSession.role,
          difficulty: newSession.difficulty
        })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setMessages([{ role: 'interviewer', content: data.reply }]);
      if (voiceEnabled) speakText(data.reply);
    } catch (e: any) {
      if (e.message === 'LIMIT_REACHED') {
        router.push('/dashboard');
      } else {
        console.error(e);
        alert(`Error starting interview: ${(e as any).message || 'Please try again'}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function sendAnswer(transcript: string) {
    if (!transcript.trim() || !session || isLoading) return;
    
    const newMessages = [...messages, { role: 'candidate', content: transcript }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      await saveCandidateMessage(session.id, transcript);
      
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          messages: newMessages,
          role: session.role,
          difficulty: session.difficulty
        })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      setMessages([...newMessages, { role: 'interviewer', content: data.reply }]);
      
      if (voiceEnabled) speakText(data.reply);
      
      if (data.isComplete) {
        setIsComplete(true);
        // Wait a bit for the video upload to trigger before redirecting
        setTimeout(() => {
          router.push(`/report/${session.id}`);
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      alert(`Error starting interview: ${(e as any).message || 'Please try again'}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!session && !isLoading) return <div className="flex h-screen items-center justify-center font-bold text-gray-500">Loading session...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col h-screen bg-gray-50 relative">
      <WebcamFeed sessionId={session?.id} isComplete={isComplete} />
      
      <div className="bg-white rounded-t-3xl border-b border-gray-100 p-6 flex justify-between items-center shadow-sm z-10">
        <div>
          <h1 className="font-bold text-xl capitalize text-gray-900">{session?.role || 'Interview'}</h1>
          <p className="text-sm text-gray-500 capitalize">Difficulty: {session?.difficulty || 'Mid'}</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <input 
              type="checkbox" 
              checked={voiceEnabled} 
              onChange={(e) => setVoiceEnabled(e.target.checked)} 
              className="accent-blue-600 w-4 h-4"
            />
            AI Voice
          </label>
          <div className="text-sm font-bold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            In Progress
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white shadow-sm border-x border-gray-100 pb-48">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'interviewer' ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-4 rounded-3xl max-w-[80%] ${
              msg.role === 'interviewer' 
                ? 'bg-gray-100 text-gray-900 rounded-tl-sm' 
                : 'bg-blue-600 text-white rounded-tr-sm shadow-md'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 p-4 rounded-3xl rounded-tl-sm flex items-center space-x-3">
              <span className="text-sm font-medium">Interviewer is typing...</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] border-t border-gray-100 z-40">
        <div className="max-w-4xl mx-auto">
          <SpeechInput onTranscript={sendAnswer} disabled={isLoading} />
        </div>
      </div>
    </div>
  )
}
