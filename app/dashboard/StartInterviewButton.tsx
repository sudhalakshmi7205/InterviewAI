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
        className="block w-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-[1.01] text-white font-bold text-center py-5 rounded-2xl text-xl shadow-lg shadow-blue-200 mb-12"
      >
        Start New Interview
      </button>
      <UpgradeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
