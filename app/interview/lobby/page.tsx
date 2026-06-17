'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Mic, Wifi, ShieldCheck, CheckCircle2, AlertCircle, Play } from 'lucide-react'

export default function InterviewLobby() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [camStatus, setCamStatus] = useState<'checking' | 'passed' | 'failed'>('checking')
  const [micStatus, setMicStatus] = useState<'checking' | 'passed' | 'failed'>('checking')
  const [netStatus, setNetStatus] = useState<'checking' | 'passed' | 'failed'>('checking')
  const [aiStatus, setAiStatus] = useState<'checking' | 'passed' | 'failed'>('checking')
  
  const [volLevel, setVolLevel] = useState(0)

  useEffect(() => {
    // 1. Network Check
    if (navigator.onLine) {
      setNetStatus('passed')
    } else {
      setNetStatus('failed')
    }

    // 2. Hardware Checks
    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let analyzer: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let animationFrameId: number;

    async function setupMedia() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setCamStatus('passed')
        setMicStatus('passed')
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Set up audio visualizer
        audioContext = new AudioContext()
        analyzer = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyzer)
        analyzer.fftSize = 256
        const bufferLength = analyzer.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)

        const draw = () => {
          if (!analyzer || !dataArray) return;
          analyzer.getByteFrequencyData(dataArray)
          // Calculate average volume
          const sum = dataArray.reduce((a, b) => a + b, 0)
          const avg = sum / bufferLength
          setVolLevel(Math.min(100, (avg / 128) * 100))
          animationFrameId = requestAnimationFrame(draw)
        }
        draw()

      } catch (err) {
        console.error("Media error:", err)
        setCamStatus('failed')
        setMicStatus('failed')
      }
    }

    setupMedia()

    // 3. AI Prep Mock
    const aiTimer = setTimeout(() => {
      setAiStatus('passed')
    }, 3000)

    return () => {
      clearTimeout(aiTimer)
      if (stream) stream.getTracks().forEach(t => t.stop())
      if (audioContext) audioContext.close()
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const allPassed = camStatus === 'passed' && micStatus === 'passed' && netStatus === 'passed' && aiStatus === 'passed'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-50 flex flex-col p-4 md:p-8">
      
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col mt-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Interview Lobby</h1>
          <p className="text-slate-400">Please verify your hardware and environment before joining the session.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 flex-1">
          
          {/* Left Column: Video Preview */}
          <div className="flex flex-col">
            <div className="relative flex-1 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden min-h-[400px] flex items-center justify-center">
              
              {camStatus === 'passed' ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover mirror"
                  style={{ transform: 'scaleX(-1)' }}
                />
              ) : camStatus === 'failed' ? (
                <div className="text-center p-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 font-bold mb-2">Camera Access Denied</p>
                  <p className="text-sm text-slate-400">Please click the lock icon in your URL bar and allow camera access to continue.</p>
                </div>
              ) : (
                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              )}

              {/* Bottom Bar overlay */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl flex items-center justify-between border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${micStatus === 'passed' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-sm font-bold">Microphone {micStatus === 'passed' ? 'Active' : 'Muted'}</span>
                </div>
                {/* Audio Visualizer Bar */}
                {micStatus === 'passed' && (
                  <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-75" 
                      style={{ width: `${volLevel}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Pre-flight Checklist */}
          <div className="flex flex-col justify-between">
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
              <h2 className="text-xl font-bold mb-6">Pre-flight Checklist</h2>
              
              <ChecklistItem 
                icon={<Camera size={20}/>} 
                label="Camera Permission" 
                status={camStatus} 
              />
              <ChecklistItem 
                icon={<Mic size={20}/>} 
                label="Microphone Audio" 
                status={micStatus} 
              />
              <ChecklistItem 
                icon={<Wifi size={20}/>} 
                label="Internet Connection" 
                status={netStatus} 
              />
              <ChecklistItem 
                icon={<ShieldCheck size={20}/>} 
                label="AI Environment Sandbox" 
                status={aiStatus} 
              />
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-blue-500/30 bg-blue-900/10 mt-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none"></div>
               <h3 className="font-bold text-lg mb-2">Ready to join?</h3>
               <p className="text-sm text-blue-200/70 mb-6">Make sure you are in a quiet environment. The AI will monitor tab-switches and facial presence.</p>
               
               <button 
                onClick={() => router.push('/interview')}
                disabled={!allPassed}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:grayscale"
              >
                {allPassed ? (
                  <>Join Interview <Play size={18} className="fill-white" /></>
                ) : (
                  'Completing Checks...'
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function ChecklistItem({ icon, label, status }: { icon: React.ReactNode, label: string, status: 'checking' | 'passed' | 'failed' }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
      status === 'passed' ? 'bg-emerald-500/10 border-emerald-500/30' :
      status === 'failed' ? 'bg-red-500/10 border-red-500/30' :
      'bg-slate-900 border-slate-800'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${
          status === 'passed' ? 'bg-emerald-500/20 text-emerald-400' :
          status === 'failed' ? 'bg-red-500/20 text-red-400' :
          'bg-slate-800 text-slate-400'
        }`}>
          {icon}
        </div>
        <span className={`font-medium ${
          status === 'passed' ? 'text-emerald-100' :
          status === 'failed' ? 'text-red-100' :
          'text-slate-400'
        }`}>
          {label}
        </span>
      </div>
      <div>
        {status === 'passed' && <CheckCircle2 className="text-emerald-400" size={20} />}
        {status === 'failed' && <AlertCircle className="text-red-400" size={20} />}
        {status === 'checking' && <div className="w-5 h-5 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />}
      </div>
    </div>
  )
}
