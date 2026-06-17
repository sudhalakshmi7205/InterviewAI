import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Terminal, BrainCircuit } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Column: Branding & Feature Highlight */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[128px] pointer-events-none"></div>
        
        <Link href="/" className="font-extrabold text-white text-2xl flex items-center gap-2 relative z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          InterviewAI
        </Link>
        
        <div className="relative z-10 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg">
            <BrainCircuit className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">Welcome back. Your next interview awaits.</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Log in to access your dashboard, review your past interview feedback, and run another mock session.
          </p>
        </div>
      </div>
      
      {/* Right Column: Clerk Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 pointer-events-none lg:hidden"></div>
        <div className="w-full max-w-md relative z-10 animate-fade-in-up">
          <Link href="/" className="lg:hidden flex items-center justify-center gap-2 mb-8 w-fit mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl">InterviewAI</span>
          </Link>
          <SignIn signUpUrl="/auth/sign-up" forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}
