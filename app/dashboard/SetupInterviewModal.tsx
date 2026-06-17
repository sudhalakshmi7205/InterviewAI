'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createNewSession } from '@/app/interview/actions'

export function SetupInterviewModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [role, setRole] = useState('') // The backend will default to their target_role if left blank
  const [difficulty, setDifficulty] = useState('mid')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  async function handleStart() {
    setIsLoading(true)
    try {
      await createNewSession(role, difficulty)
      // Redirect to the new Interview Lobby instead of directly to interview
      router.push('/interview/lobby')
    } catch (e: any) {
      console.error(e)
      alert(e.message || "Failed to start session")
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-8 border border-slate-700/50 shadow-2xl relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Start Interview</h2>
          <p className="text-slate-400 mb-8">Ready to test your skills? We'll use your saved resume to personalize the questions.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Target Role (Optional Override)</label>
              <input 
                type="text" 
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="Leave blank to use your profile's role"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Difficulty</label>
              <select 
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleStart}
              disabled={isLoading}
              className="flex-1 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Enter Lobby →'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
