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
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">{label}</div>
      <div className="text-4xl font-extrabold text-gray-900">{value}</div>
    </div>
  )
}

function SessionRow({ session }: { session: any }) {
  const date = new Date(session.started_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center mb-4">
      <div>
        <div className="font-bold text-lg text-gray-900 capitalize">{session.role} Interview</div>
        <div className="text-sm text-gray-500 mt-1">{date} &bull; <span className="capitalize">{session.difficulty}</span></div>
      </div>
      <div className="flex items-center gap-6">
        {session.status === 'completed' ? (
          <div className="font-bold text-green-700 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
            Score: {session.overall_score}/100
          </div>
        ) : (
          <div className="font-bold text-yellow-700 bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100">
            In Progress
          </div>
        )}
        <Link href={session.status === 'completed' ? `/report/${session.id}` : `/interview`} className="text-blue-600 font-bold hover:text-blue-800 transition-colors">
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
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.firstName}</h1>
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
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Past sessions</h2>
          {(!sessions || sessions.length === 0) && (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions yet</h3>
              <p className="text-gray-500">Your interview history will appear here. Start your first session above!</p>
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
