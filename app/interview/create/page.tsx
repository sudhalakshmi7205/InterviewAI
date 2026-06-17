'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNewSession } from '@/app/interview/actions'
import { Settings, Play, Target, Briefcase, Clock, Code2, Volume2, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function CreateInterviewPage() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('mid')
  const [duration, setDuration] = useState('30')
  const [language, setLanguage] = useState('Python')
  const [company, setCompany] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleStart() {
    setIsLoading(true)
    try {
      // Create session in DB. We pass role and difficulty. 
      // We'll need to update createNewSession to support company and language later if needed,
      // but for now the DB takes role and difficulty. We can inject company/lang into the role string temporarily.
      const combinedRole = company ? `${role || 'Software Engineer'} at ${company}` : role;
      await createNewSession(combinedRole, difficulty)
      
      // Navigate to Zoom-style lobby
      router.push('/interview/lobby')
    } catch (e: any) {
      console.error(e)
      alert(e.message || "Failed to create session")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-10">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Settings className="text-blue-500" /> Configure Interview
            </h1>
            <p className="text-slate-400">Set the parameters for your next mock interview. The AI will adapt dynamically.</p>
          </div>
          <Link href="/dashboard" className="text-slate-400 hover:text-white font-bold transition-colors">
            Cancel
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left Column: Core Setup */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase size={20} className="text-purple-400"/> Role & Difficulty</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Target Role</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
                  <select 
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors appearance-none"
                  >
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                    <option value="staff">Staff/Principal (10+ years)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Target size={20} className="text-emerald-400"/> Specific Targeting</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Target Company</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">Pro</span>
                  </label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Stripe, Meta, Amazon"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Environment Details */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Code2 size={20} className="text-pink-400"/> Technical Environment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Language</label>
                  <select 
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors appearance-none"
                  >
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="Go">Go</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['15', '30', '45'].map(min => (
                      <button 
                        key={min}
                        onClick={() => setDuration(min)}
                        className={`py-2 rounded-lg font-bold text-sm border transition-all ${duration === min ? 'bg-blue-600 border-blue-500' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                      >
                        {min} min
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Box */}
            <div className="glass-panel p-6 rounded-2xl border border-blue-500/50 bg-blue-900/10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-lg font-bold mb-2">Ready to test yourself?</h3>
              <p className="text-blue-200/70 text-sm mb-6">The AI will generate questions based on your resume and these settings.</p>
              
              <button 
                onClick={handleStart}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Enter Lobby <Play size={18} className="fill-white" /></>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
