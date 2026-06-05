'use client'

import { useState } from 'react'

export function UpgradeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  
  if (!isOpen) return null;
  
  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl">&times;</button>
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Pro</h2>
          <p className="text-gray-600 mb-6">You've reached the limit of 3 free interviews. Upgrade to Pro for unlimited AI interviews and detailed feedback reports.</p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
            <div className="text-3xl font-extrabold text-gray-900">$12<span className="text-lg text-gray-500 font-normal">/month</span></div>
            <ul className="text-left mt-4 space-y-2 text-sm text-gray-700">
              <li>✅ Unlimited interviews</li>
              <li>✅ Voice & Video analysis</li>
              <li>✅ Detailed Claude 3.5 scorecards</li>
              <li>✅ Resume at any time</li>
            </ul>
          </div>
          <button 
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 shadow-lg"
          >
            {loading ? 'Redirecting to Stripe...' : 'Upgrade Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
