'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getActiveSession, saveCandidateMessage, uploadRecording, endSessionEarly, logViolation } from './actions'
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision'
import { CodeEditor } from './CodeEditor'

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
    let detector: FaceDetector;
    let isRunning = true;
    
    async function initFaceDetector() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU"
        },
        runningMode: "VIDEO"
      });
      
      detectFaces();
    }
    
    async function detectFaces() {
      if (!videoRef.current || !isRunning || !detector) return;
      if (videoRef.current.readyState >= 2) {
        const detections = detector.detectForVideo(videoRef.current, performance.now());
        const count = detections.detections.length;
        
        if (count !== 1) {
            videoRef.current.style.borderColor = 'red';
            // Log violation maximum once every 10 seconds to avoid spam
            if (!videoRef.current.dataset.lastViolation || Date.now() - parseInt(videoRef.current.dataset.lastViolation) > 10000) {
               videoRef.current.dataset.lastViolation = Date.now().toString();
               if (sessionId) logViolation(sessionId, 'face').catch(console.error);
            }
        } else {
            videoRef.current.style.borderColor = 'white';
        }
      }
      if (isRunning) requestAnimationFrame(detectFaces);
    }
    
    initFaceDetector();
    
    return () => {
      isRunning = false;
      detector?.close();
    }
  }, []);
  
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
      className="w-32 h-24 md:w-48 md:h-36 rounded-2xl object-cover absolute top-6 right-6 shadow-2xl border-2 border-slate-700/50 z-50 transition-all duration-300 hover:scale-105"
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
  const [code, setCode] = useState<string>('# Write your code here\n\n')
  
  const [tabViolations, setTabViolations] = useState(0)
  const [faceViolations, setFaceViolations] = useState(0)
  
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isComplete && session) {
        setTabViolations(v => v + 1);
        alert("⚠️ WARNING: Tab switching detected! Please remain on this tab. Violations will be recorded.");
        logViolation(session.id, 'tab').catch(console.error);
      }
    };
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isComplete && session) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome to show warning
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isComplete, session]);

  useEffect(() => {
    startSession()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startSession() {
    setIsLoading(true);
    try {
      const { session: newSession, messages: existingMsgs, isResumed } = await getActiveSession();
      if (!newSession) {
        router.push('/dashboard');
        return;
      }
      setSession(newSession);
      
      if (isResumed && existingMsgs.length > 0) {
        setMessages(existingMsgs);
        return; // Skip triggering the initial AI greeting if resuming!
      }
      
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: newSession.id,
          messages: [],
          role: newSession.role,
          difficulty: newSession.difficulty,
          resumeText: newSession.resume_text || ''
        })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'API Error');
      }
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
    if (!transcript.trim() && !code.trim() || !session || isLoading) return;
    
    // Append the code block to the answer if the candidate wrote code
    const fullAnswer = transcript + (code.trim() && code !== '# Write your code here\n\n' ? `\n\n[CANDIDATE CODE SUBMISSION]\n\`\`\`\n${code}\n\`\`\`` : '');
    
    const newMessages = [...messages, { role: 'candidate', content: fullAnswer }];
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
          difficulty: session.difficulty,
          resumeText: session.resume_text || ''
        })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'API Error');
      }
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

  async function handleEndInterview() {
    if (!session || isLoading) return;
    if (confirm("Are you sure you want to end the interview early? Your feedback will be generated based on the current progress.")) {
      setIsLoading(true);
      try {
        await endSessionEarly(session.id);
        setIsComplete(true);
        setTimeout(() => {
          router.push(`/report/${session.id}`);
        }, 2000);
      } catch (e) {
        console.error(e);
        alert("Failed to end interview early.");
        setIsLoading(false);
      }
    }
  }

  const [hasStartedInteraction, setHasStartedInteraction] = useState(false)

  if (!session && !isLoading) {
    return (
      <div className="flex flex-col lg:flex-row h-screen bg-slate-950 p-4 gap-4">
        <div className="flex-1 flex flex-col min-w-[50%] h-full relative">
          <div className="w-32 h-24 md:w-48 md:h-36 rounded-2xl bg-slate-900 absolute top-6 right-6 border-2 border-slate-800 animate-pulse z-50"></div>
          <div className="glass-panel rounded-t-3xl border-b border-slate-800 p-6 flex justify-between items-center z-10 h-24 animate-pulse"></div>
          <div className="flex-1 glass-panel rounded-b-none border-x border-slate-800 p-8 space-y-6">
            <div className="w-3/4 h-32 bg-slate-900 rounded-3xl rounded-tl-sm animate-pulse"></div>
            <div className="w-1/2 h-24 bg-blue-900/20 rounded-3xl rounded-tr-sm ml-auto animate-pulse"></div>
            <div className="w-2/3 h-40 bg-slate-900 rounded-3xl rounded-tl-sm animate-pulse"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 glass-panel p-4 rounded-b-3xl h-32 animate-pulse"></div>
        </div>
        <div className="flex-1 min-w-[40%] h-full hidden lg:block bg-slate-900 rounded-3xl border border-slate-800 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 p-4 gap-4 relative">
      
      {/* Explicit User Interaction Overlay to unlock Audio */}
      {!hasStartedInteraction && session && (
        <div className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center">
          <div className="glass-panel p-10 rounded-3xl text-center max-w-md border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h2>
            <p className="text-slate-400 mb-8">Clicking start will unlock your browser's audio engine so you can hear the interviewer.</p>
            <button 
              onClick={() => {
                setHasStartedInteraction(true);
                // If we are resuming, and the last message was from the interviewer, speak it!
                if (messages.length > 0 && messages[messages.length - 1].role === 'interviewer' && voiceEnabled) {
                   speakText(messages[messages.length - 1].content);
                }
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl w-full transition-colors shadow-lg shadow-blue-500/30"
            >
              Start Interview Audio
            </button>
          </div>
        </div>
      )}

      {/* Left Column: Chat & Webcam */}
      <div className="flex-1 flex flex-col min-w-[50%] h-full relative">
        <WebcamFeed sessionId={session?.id} isComplete={isComplete} />
        
        <div className="glass-panel rounded-t-3xl border-b border-slate-700/50 p-6 flex justify-between items-center z-10 shadow-2xl">
          <div>
            <h1 className="font-bold text-xl capitalize text-white">{session?.role || 'Interview'}</h1>
            <p className="text-sm text-slate-400 capitalize">Difficulty: {session?.difficulty || 'Mid'}</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-300 glass-panel px-3 py-1.5 rounded-full border border-slate-600">
              <input 
                type="checkbox" 
                checked={voiceEnabled} 
                onChange={(e) => setVoiceEnabled(e.target.checked)} 
                className="accent-blue-600 w-4 h-4"
              />
              AI Voice
            </label>
            <div className="text-sm font-bold text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/20 animate-pulse-glow">
              In Progress
            </div>
            <button 
              onClick={handleEndInterview} 
              disabled={isLoading || isComplete}
              className="text-sm font-bold text-white bg-red-600/80 hover:bg-red-600 px-4 py-1.5 rounded-full border border-red-500/50 transition-colors disabled:opacity-50"
            >
              🛑 End
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 glass-panel rounded-b-none border-x border-slate-700/50 pb-48">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'interviewer' ? 'justify-start' : 'justify-end'}`}>
              <div className={`p-5 rounded-3xl max-w-[90%] shadow-lg ${
                msg.role === 'interviewer' 
                  ? 'bg-slate-800 text-white rounded-tl-sm border border-slate-700' 
                  : 'bg-blue-600 text-white rounded-tr-sm border border-blue-500'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 text-slate-400 p-5 rounded-3xl rounded-tl-sm flex items-center space-x-3 shadow-lg">
                <span className="text-sm font-medium">Interviewer is typing...</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
          
          {messages.length > 0 && !isLoading && messages[messages.length - 1].role === 'interviewer' && (
            <div className="flex justify-center mt-8 opacity-50">
              <div className="bg-slate-800 text-slate-400 text-sm px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                AI is waiting for your response. Click "Start Speaking" below.
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 glass-panel p-4 rounded-b-3xl border-t border-slate-700/50 z-40">
          <SpeechInput onTranscript={sendAnswer} disabled={isLoading} />
        </div>
      </div>

      {/* Right Column: Monaco Code Editor */}
      <div className="flex-1 min-w-[40%] h-[50vh] lg:h-full hidden lg:block">
        <CodeEditor code={code} onChange={setCode} />
      </div>
    </div>
  )
}
