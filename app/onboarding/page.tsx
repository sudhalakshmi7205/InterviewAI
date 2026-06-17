'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './actions'
import { BrainCircuit, FileText, Code2, Target, Briefcase, Building2, CheckCircle2 } from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState(0) // 0 = Welcome, 1=Role, 2=Exp, 3=Companies, 4=Lang, 5=Resume, 6=Goal, 7=Final
  
  const [role, setRole] = useState('')
  const [level, setLevel] = useState('')
  const [companies, setCompanies] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [resumeText, setResumeText] = useState('')
  const [goal, setGoal] = useState('')
  
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const ROLES = ['Frontend', 'Backend', 'Full Stack', 'ML', 'DevOps', 'QA', 'Data', 'Cybersecurity']
  const LEVELS = ['Student', '0-1 Years', '1-3 Years', '3-5 Years', '5+ Years']
  const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Zoho', 'TCS', 'Accenture', 'Startup']
  const LANGUAGES = ['Python', 'Java', 'C++', 'JS', 'Go', 'Rust']
  const GOALS = ['Interview Tomorrow', 'Improve Communication', 'Coding Practice', 'Placement', 'Promotion']

  // Auto-advance Welcome Screen
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2500)
      return () => clearTimeout(timer)
    }
  }, [step])

  // Final Animation Sequence
  useEffect(() => {
    if (step === 7) {
      const runFinalSequence = async () => {
        setIsGenerating(true)
        await completeOnboarding(role, level, companies, languages, resumeText, goal)
        // Simulate "Building Profile" steps
        await new Promise(r => setTimeout(r, 3000))
        router.push('/dashboard')
      }
      runFinalSequence()
    }
  }, [step, role, level, companies, languages, resumeText, goal, router])

  const toggleArray = (item: string, arr: string[], setArr: (val: string[]) => void) => {
    if (arr.includes(item)) setArr(arr.filter(i => i !== item))
    else setArr([...arr, item])
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transition-all duration-1000" 
           style={{ transform: `translate(-50%, -50%) scale(${1 + (step * 0.1)})` }}/>

      {/* Step Progress Bar */}
      {step > 0 && step < 7 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-900">
          <div className="h-full bg-blue-500 transition-all duration-500 ease-out" style={{ width: `${(step / 6) * 100}%` }} />
        </div>
      )}

      {/* STEP 0: WELCOME */}
      {step === 0 && (
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(59,130,246,0.6)] mb-8 animate-pulse">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Let's build your AI Profile</h1>
          <p className="text-slate-400">Customizing the Llama 3 engine for you...</p>
        </div>
      )}

      {/* MAIN CONTAINER */}
      {step > 0 && step < 7 && (
        <div className="w-full max-w-2xl relative z-10 glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl animate-fade-in-up">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><Briefcase className="text-blue-400"/><h2 className="text-2xl font-bold">Target Role</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {ROLES.map(r => (
                  <button key={r} onClick={() => setRole(r)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all border ${role === r ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}>
                    {r}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} disabled={!role} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 disabled:opacity-50">Next →</button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><Target className="text-purple-400"/><h2 className="text-2xl font-bold">Experience Level</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {LEVELS.map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all border ${level === l ? 'bg-purple-600 border-purple-500 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="w-1/3 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold">Back</button>
                <button onClick={() => setStep(3)} disabled={!level} className="w-2/3 bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><Building2 className="text-emerald-400"/><h2 className="text-2xl font-bold">Companies You're Preparing For</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {COMPANIES.map(c => (
                  <button key={c} onClick={() => toggleArray(c, companies, setCompanies)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all border flex items-center justify-center gap-2 ${companies.includes(c) ? 'bg-emerald-600 border-emerald-500 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}>
                    {companies.includes(c) && <CheckCircle2 size={16}/>} {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="w-1/3 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold">Back</button>
                <button onClick={() => setStep(4)} disabled={companies.length===0} className="w-2/3 bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><Code2 className="text-pink-400"/><h2 className="text-2xl font-bold">Preferred Languages</h2></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {LANGUAGES.map(l => (
                  <button key={l} onClick={() => toggleArray(l, languages, setLanguages)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all border flex items-center justify-center gap-2 ${languages.includes(l) ? 'bg-pink-600 border-pink-500 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}>
                    {languages.includes(l) && <CheckCircle2 size={16}/>} {l}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(3)} className="w-1/3 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold">Back</button>
                <button onClick={() => setStep(5)} disabled={languages.length===0} className="w-2/3 bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><FileText className="text-orange-400"/><h2 className="text-2xl font-bold">Resume Upload</h2></div>
              <textarea 
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-4 h-48 focus:outline-none focus:border-orange-500 transition-colors resize-none mb-8"
                placeholder="Paste your resume or LinkedIn summary here..."
              />
              <div className="flex gap-4">
                <button onClick={() => setStep(4)} className="w-1/3 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold">Back</button>
                <button onClick={() => setStep(6)} className={`w-2/3 font-bold py-4 rounded-xl transition-all ${resumeText ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                  {resumeText ? 'Next →' : 'Skip for now →'}
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-6"><Target className="text-yellow-400"/><h2 className="text-2xl font-bold">What is your primary goal?</h2></div>
              <div className="flex flex-col gap-3 mb-8">
                {GOALS.map(g => (
                  <button key={g} onClick={() => setGoal(g)}
                    className={`py-4 rounded-xl text-left px-6 font-bold transition-all border flex justify-between items-center ${goal === g ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'}`}>
                    {g} {goal === g && <CheckCircle2 size={18}/>}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(5)} className="w-1/3 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-bold">Back</button>
                <button onClick={() => setStep(7)} disabled={!goal} className="w-2/3 bg-blue-600 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] font-bold py-4 rounded-xl hover:bg-blue-500 disabled:opacity-50">Generate Profile →</button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* STEP 7: FINAL ANIMATION */}
      {step === 7 && (
        <div className="flex flex-col items-center justify-center max-w-md w-full animate-fade-in-up">
          <div className="w-24 h-24 relative mb-8">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center"><BrainCircuit className="text-blue-400 w-10 h-10 animate-pulse"/></div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Generating AI Profile...</h2>
          
          <div className="w-full space-y-4 font-mono text-sm">
            <div className="flex items-center gap-3 text-slate-400">
              <CheckCircle2 size={16} className="text-emerald-500"/> Analyzing Resume
            </div>
            <div className="flex items-center gap-3 text-slate-400 animate-in fade-in slide-in-from-bottom-2 delay-500 fill-mode-both">
              <CheckCircle2 size={16} className="text-emerald-500"/> Building Skill Graph
            </div>
            <div className="flex items-center gap-3 text-slate-400 animate-in fade-in slide-in-from-bottom-2 delay-1000 fill-mode-both">
              <CheckCircle2 size={16} className="text-emerald-500"/> Calibrating Difficulty
            </div>
            <div className="flex items-center gap-3 text-blue-400 font-bold animate-in fade-in slide-in-from-bottom-2 delay-[1500ms] fill-mode-both">
              <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" /> Finalizing...
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
