import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 0; // Disable caching so data is always fresh

export default async function AdminDashboard() {
  // Fetch high-level stats
  const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true })
  const { count: sessionCount } = await supabase.from('sessions').select('*', { count: 'exact', head: true }).eq('status', 'completed')
  
  // Calculate average score
  const { data: reports } = await supabase.from('reports').select('overall_score')
  const avgScore = reports && reports.length > 0 
    ? (reports.reduce((acc, r) => acc + r.overall_score, 0) / reports.length).toFixed(1)
    : 'N/A'
    
  // Fetch recent interviews joining sessions, users, and reports
  const { data: recentInterviews } = await supabase
    .from('sessions')
    .select(`
      id,
      role,
      difficulty,
      created_at,
      status,
      users ( email ),
      reports ( overall_score )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Admin Overview</h1>
        <p className="text-slate-500">Monitor platform usage and review candidate interviews.</p>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
          <div className="text-4xl font-extrabold text-blue-600">{userCount || 0}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Completed Interviews</p>
          <div className="text-4xl font-extrabold text-indigo-600">{sessionCount || 0}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Avg Score</p>
          <div className="text-4xl font-extrabold text-emerald-600">{avgScore}/10</div>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Recent Candidate Interviews</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Candidate Email</th>
                <th className="px-6 py-4">Target Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">AI Score</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInterviews?.map((interview: any) => (
                <tr key={interview.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {interview.users?.email || 'Unknown User'}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {interview.role} ({interview.difficulty})
                  </td>
                  <td className="px-6 py-4">
                    {interview.status === 'completed' 
                      ? <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-bold">Completed</span>
                      : <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-bold">In Progress</span>
                    }
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {interview.reports?.[0]?.overall_score ? `${interview.reports[0].overall_score}/10` : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(interview.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/interview/${interview.id}`}
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                    >
                      Review &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
              
              {(!recentInterviews || recentInterviews.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No interviews found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
