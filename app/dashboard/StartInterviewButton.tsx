'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UpgradeModal } from './UpgradeModal'

export function StartInterviewButton({ limitReached }: { limitReached: boolean }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  
  return (
    <>
      <button 
        onClick={() => limitReached ? setShowModal(true) : router.push('/interview')}
        className="relative block w-full group overflow-hidden bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 text-white font-bold text-center py-6 rounded-2xl text-xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.5)] mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shimmer_1.5s_infinite]" />
        <span className="relative z-10 flex items-center justify-center gap-3">
          Start New Interview <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </button>
      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
