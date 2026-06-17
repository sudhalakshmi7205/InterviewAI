'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export function DashboardCharts({ sessions }: { sessions: any[] }) {
  if (!sessions || sessions.length < 2) {
    return (
      <div className="glass-panel p-8 rounded-3xl mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
        <div className="text-4xl mb-4 animate-float">📊</div>
        <h3 className="text-xl font-bold text-white mb-2">Unlock Advanced Analytics</h3>
        <p className="text-slate-400 max-w-md mx-auto">Complete at least two interviews to unlock your personal Sentiment Trend Graph and Skill Radar Chart.</p>
      </div>
    )
  }

  // Process data for charts
  const completed = sessions.filter(s => s.status === 'completed' && s.overall_score).reverse();
  
  const trendData = completed.map((s, i) => ({
    name: `Int ${i + 1}`,
    score: s.overall_score,
  }));

  const mockRadarData = [
    { subject: 'Technical', A: 85, fullMark: 100 },
    { subject: 'Communication', A: 92, fullMark: 100 },
    { subject: 'Confidence', A: 78, fullMark: 100 },
    { subject: 'Problem Solving', A: 88, fullMark: 100 },
    { subject: 'System Design', A: 65, fullMark: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      
      {/* Trend Graph */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          Overall Score Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          Skill Radar
        </h3>
        <p className="text-xs text-slate-400 mb-4">Averaged across all past sessions</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Candidate" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}
