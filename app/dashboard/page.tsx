import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { StartInterviewButton } from './StartInterviewButton';

function avgScore(sessions: any[]) {
  if (!sessions || sessions.length === 0) return 0;
  const completed = sessions.filter(s => s.overall_score !== null);
  if (completed.length === 0) return 0;
  const total = completed.reduce((acc, s) => acc + s.overall_score, 0);
  return Math.round(total / completed.length);
}

function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center text-center">
      <div className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">{label}</div>
      <div className="text-4xl font-extrabold text-white">{value}</div>
    </div>
  )
}

function SessionRow({ session }: { session: any }) {
  const date = new Date(session.started_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  
  return (
    <div className="glass-panel p-6 rounded-2xl hover:border-slate-700/80 transition-colors flex justify-between items-center mb-4">
      <div>
        <div className="font-bold text-lg text-white capitalize">{session.role} Interview</div>
        <div className="text-sm text-slate-400 mt-1">{date} &bull; <span className="capitalize">{session.difficulty}</span></div>
      </div>
      <div className="flex items-center gap-6">
        {session.status === 'completed' ? (
          <div className="font-bold text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">
            Score: {session.overall_score}/100
          </div>
        ) : (
          <div className="font-bold text-yellow-400 bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/20 animate-pulse-glow">
            In Progress
          </div>
        )}
        <Link href={session.status === 'completed' ? `/report/${session.id}` : `/interview`} className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
          {session.status === 'completed' ? 'View Report' : 'Resume'} &rarr;
        </Link>
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return null;

  // Fetch sessions
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false });
  
  // Fetch user data
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  const sessionsRemaining = userData?.plan === 'free' 
    ? Math.max(0, 3 - (userData?.sessions_used || 0)) 
    : '∞';
    
  const limitReached = userData?.plan === 'free' && (userData?.sessions_used || 0) >= 3;

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10 glass-panel p-6 rounded-3xl">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{user.firstName}</span>
          </h1>
          <UserButton />
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Sessions completed" value={sessions?.filter(s => s.status === 'completed').length || 0} />
          <StatCard label="Average score" value={avgScore(sessions || [])} />
          <StatCard label="Sessions remaining" value={sessionsRemaining} />
        </div>
        
        {/* Start button */}
        <StartInterviewButton limitReached={limitReached} />
        
        {/* Past sessions */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            Past sessions
            <div className="h-px bg-slate-800 flex-1 ml-4" />
          </h2>
          {(!sessions || sessions.length === 0) && (
            <div className="glass-panel rounded-3xl p-12 text-center">
              <div className="text-4xl mb-4 animate-float">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">No sessions yet</h3>
              <p className="text-slate-400">Your interview history will appear here. Start your first session above!</p>
            </div>
          )}
          {sessions?.map(session => (
            <SessionRow key={session.id} session={session} />
          ))}
        </div>
      </div>
    </main>
  );
}
