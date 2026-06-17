import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { DashboardCharts } from './DashboardCharts';
import { Flame, Trophy, Star, ArrowRight, Play, Clock, Code2 } from 'lucide-react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function SessionRow({ session }: { session: any }) {
  const date = new Date(session.started_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  
  return (
    <div className="glass-panel p-5 rounded-2xl hover:border-slate-700/80 transition-colors flex justify-between items-center mb-3">
      <div>
        <div className="font-bold text-lg text-white capitalize">{session.role} Interview</div>
        <div className="text-sm text-slate-400 mt-1">{date} &bull; <span className="capitalize">{session.difficulty}</span></div>
      </div>
      <div className="flex items-center gap-4">
        {session.status === 'completed' ? (
          <div className="font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 text-sm">
            {session.overall_score || 0}/100
          </div>
        ) : (
          <div className="font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 text-sm animate-pulse-glow">
            In Progress
          </div>
        )}
        <Link href={session.status === 'completed' ? `/report/${session.id}` : `/interview`} className="text-blue-400 font-bold hover:text-blue-300 transition-colors text-sm flex items-center gap-1">
          {session.status === 'completed' ? 'Report' : 'Resume'} <ArrowRight size={16}/>
        </Link>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return null;

  // Fetch user data including new Gamification stats
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!userData || !userData.target_role) {
    redirect('/onboarding');
  }

  // Fetch sessions
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false });

  const activeSession = sessions?.find(s => s.status === 'in_progress');
  const pastSessions = sessions?.filter(s => s.status === 'completed').slice(0, 5);

  const xp = userData?.xp || 0;
  const rank = userData?.rank || 'Novice';
  const streak = userData?.streak_days || 0;
  const nextRankXp = 1000;
  const progressPercent = Math.min(100, (xp / nextRankXp) * 100);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 relative overflow-hidden text-slate-50">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-1">{getGreeting()}</p>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {user.firstName} {user.lastName} 👋
              </h1>
            </div>
            <UserButton />
          </div>

          {/* Resume Session Alert (If active) */}
          {activeSession && (
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-yellow-500/50 to-orange-500/50 shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] mb-6">
              <div className="glass-panel p-8 rounded-[23px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm uppercase tracking-wider mb-2">
                    <Clock size={16} /> Interview In Progress
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeSession.role}</h2>
                  <p className="text-slate-400 text-sm">You left this session early. Jump back in to finish it.</p>
                </div>
                <Link href="/interview/lobby" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg whitespace-nowrap">
                  <Play size={18} className="fill-black" /> Resume Session
                </Link>
              </div>
            </div>
          )}

          {/* Primary Action (Start New) */}
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay rounded-3xl pointer-events-none"></div>
            <div className="bg-[#0a0a0a]/40 backdrop-blur-xl p-8 rounded-[23px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">Ready for your next challenge?</h2>
                <p className="text-blue-100/70 text-sm">Create a highly customized mock interview tailored to {userData.target_role}.</p>
              </div>
              <Link href="/interview/create" className="relative z-10 flex items-center gap-2 bg-white hover:bg-slate-200 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-xl group whitespace-nowrap">
                Start Interview <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recent Interviews */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Interviews</h2>
              <Link href="/dashboard/history" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">View All</Link>
            </div>
            
            {(!pastSessions || pastSessions.length === 0) ? (
              <div className="glass-panel rounded-2xl p-10 text-center border border-slate-800">
                <div className="text-slate-500 mb-4">No interviews completed yet.</div>
                <p className="text-sm text-slate-400">Complete your first interview to generate an incredibly detailed AI analysis report.</p>
              </div>
            ) : (
              pastSessions.map(session => (
                <SessionRow key={session.id} session={session} />
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Gamification & Stats */}
        <div className="space-y-6">
          
          {/* Gamification Profile */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Trophy size={100} />
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Flame className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Current Streak</div>
                <div className="text-2xl font-black text-white">{streak} Days</div>
              </div>
            </div>

            <div className="mb-2 flex justify-between items-end">
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Rank</div>
                <div className="text-xl font-bold text-blue-400">{rank}</div>
              </div>
              <div className="text-sm font-mono text-slate-400">{xp} / {nextRankXp} XP</div>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Achievements</h3>
            <div className="grid grid-cols-4 gap-2">
              {/* Fake Badges for visual flair */}
              <div className="aspect-square rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center p-2 text-center group cursor-pointer">
                <Star className="text-emerald-400 w-6 h-6 mb-1 group-hover:scale-110 transition-transform"/>
                <span className="text-[10px] text-slate-400">First Try</span>
              </div>
              <div className="aspect-square rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center p-2 text-center group cursor-pointer">
                <Code2 className="text-purple-400 w-6 h-6 mb-1 group-hover:scale-110 transition-transform"/>
                <span className="text-[10px] text-slate-400">No Bugs</span>
              </div>
              <div className="aspect-square rounded-xl bg-slate-800/50 border border-slate-800 flex flex-col items-center justify-center p-2 text-center opacity-30">
                <Trophy className="text-slate-600 w-6 h-6 mb-1"/>
                <span className="text-[10px] text-slate-600">LOCKED</span>
              </div>
              <div className="aspect-square rounded-xl bg-slate-800/50 border border-slate-800 flex flex-col items-center justify-center p-2 text-center opacity-30">
                <Flame className="text-slate-600 w-6 h-6 mb-1"/>
                <span className="text-[10px] text-slate-600">LOCKED</span>
              </div>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Performance</h3>
             <DashboardCharts sessions={sessions || []} />
          </div>

        </div>
      </div>
    </main>
  );
}
