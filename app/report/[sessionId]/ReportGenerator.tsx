'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function ReportGenerator({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    async function generate() {
      try {
        const res = await fetch('/api/report/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
        if (!res.ok) throw new Error('Failed to generate report. Claude might be overloaded.');
        router.refresh();
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }
    generate()
  }, [sessionId, router])
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-8">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error Generating Report</h2>
      <p className="text-gray-600 max-w-md">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-8 bg-black text-white px-6 py-3 rounded-lg font-bold">Try Again</button>
    </div>
  )
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Analyzing your interview...</h2>
      <p className="text-gray-500 text-lg">Claude is reviewing your answers. This usually takes about 10-15 seconds.</p>
    </div>
  )
}
