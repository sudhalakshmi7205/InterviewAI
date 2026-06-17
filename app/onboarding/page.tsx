'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './actions'
import { BrainCircuit } from 'lucide-react'

export default function OnboardingPage() {
  const [role, setRole] = useState('')
  const [level, setLevel] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const popularRoles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Frontend Developer', 'Backend Developer']
  const levels = ['Intern', 'Junior', 'Mid-Level', 'Senior', 'Staff', 'Principal']

  async function handleComplete() {
    if (!role || !level) return;
    setIsLoading(true)
    try {
      await completeOnboarding(role, level)
      router.push('/dashboard')
    } catch (e) {
      alert("Something went wrong.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] mb-6">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight text-center mb-4">
            Welcome to InterviewAI
          </h1>
          <p className="text-slate-400 text-lg text-center max-w-lg">
            Let's calibrate the AI to your exact career goals so we can give you the most accurate interviews possible.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-700/50 shadow-2xl">
          
          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
              What is your target role?
            </label>
            <div className="flex flex-wrap gap-3 mb-4">
              {popularRoles.map(r => (
                <button 
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    role === r 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)]' 
                      : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="Or type a custom role..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-12">
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
              What is your experience level?
            </label>
            <div className="flex flex-wrap gap-3">
              {levels.map(l => (
                <button 
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                    level === l 
                      ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)]' 
                      : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleComplete}
            disabled={!role || !level || isLoading}
            className="w-full relative group overflow-hidden bg-white text-slate-950 font-bold py-4 rounded-xl text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin mx-auto" />
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-2">
                Launch Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
