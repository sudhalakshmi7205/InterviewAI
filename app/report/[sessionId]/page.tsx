import { supabase } from '@/lib/supabase'
import { ReportGenerator } from './ReportGenerator'
import Link from 'next/link'

export default async function ReportPage({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;
  
  const { data: report } = await supabase
    .from('reports')
    .select('*, sessions(*)')
    .eq('session_id', sessionId)
    .single()
  
  // If report isn't generated yet, render the loading state which will trigger the API
  if (!report) {
    return <ReportGenerator sessionId={sessionId} />
  }
  
  const formatKey = (key: string) => {
    return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="text-blue-600 font-bold hover:underline">&larr; Back to Dashboard</Link>
        </div>
        
        {/* Score header */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center mb-8">
          <div className="text-7xl font-extrabold text-gray-900 mb-4">{report.overall_score}/10</div>
          <p className="text-xl text-gray-500 font-medium capitalize">{report.sessions?.role} interview &bull; {report.sessions?.difficulty}</p>
          {report.overall_summary && (
            <p className="mt-6 text-gray-700 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-lg">{report.overall_summary}</p>
          )}
        </div>
        
        {/* Dimension scores */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {Object.entries(report.dimension_scores).map(([key, val]) => (
            <div key={key} className="bg-white text-center border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="text-4xl font-extrabold text-blue-600">{val as number}/10</div>
              <div className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-wide">{formatKey(key)}</div>
            </div>
          ))}
        </div>
        
        {/* Per-question breakdown */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Breakdown</h2>
          {report.question_feedback.map((q: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6 gap-6">
                <h3 className="font-bold text-lg text-gray-900 leading-relaxed"><span className="text-blue-600 mr-2">Q{i+1}:</span> {q.question}</h3>
                <span className="text-xl font-extrabold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl whitespace-nowrap">{q.score}/10</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Answer</h4>
                <p className="text-gray-700 italic bg-gray-50 p-4 rounded-xl">"{q.candidate_answer}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 border border-green-100 p-5 rounded-2xl">
                  <div className="text-green-700 font-bold mb-2 flex items-center gap-2"><span>✨</span> What worked</div>
                  <div className="text-gray-700 text-sm">{q.strength}</div>
                </div>
                <div className="bg-red-50/50 border border-red-100 p-5 rounded-2xl">
                  <div className="text-red-700 font-bold mb-2 flex items-center gap-2"><span>📈</span> To improve</div>
                  <div className="text-gray-700 text-sm">{q.improvement}</div>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                <div className="text-blue-700 font-bold mb-2 flex items-center gap-2"><span>💡</span> Ideal Answer Strategy</div>
                <div className="text-gray-700 text-sm">{q.ideal_answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
