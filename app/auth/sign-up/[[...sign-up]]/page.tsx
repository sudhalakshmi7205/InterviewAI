import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Terminal, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Column: Branding & Testimonial */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-slate-900 border-r border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px] pointer-events-none"></div>
        
        <Link href="/" className="font-extrabold text-white text-2xl flex items-center gap-2 relative z-10 w-fit hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          InterviewAI
        </Link>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">Join 10,000+ engineers landing offers at top tech companies.</h2>
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-blue-500 w-5 h-5" />
              <span>Live code execution sandbox</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-blue-500 w-5 h-5" />
              <span>Dynamic resume parsing</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="text-blue-500 w-5 h-5" />
              <span>Sentiment & confidence analytics</span>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 relative">
            <div className="absolute -top-3 -left-3 text-4xl">"</div>
            <p className="text-slate-300 italic relative z-10 mb-4">
              I had bombed three technical screens before using this. The AI is brutal, but it prepared me perfectly for my Meta onsite. I literally just signed the offer letter!
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700"></div>
              <div>
                <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                <div className="text-slate-500 text-xs">Software Engineer @ Meta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column: Clerk Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none lg:hidden"></div>
        <div className="w-full max-w-md relative z-10 animate-fade-in-up">
          <Link href="/" className="lg:hidden flex items-center justify-center gap-2 mb-8 w-fit mx-auto">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl">InterviewAI</span>
          </Link>
          <SignUp signInUrl="/auth/sign-in" forceRedirectUrl="/onboarding" />
        </div>
      </div>
    </div>
  );
}
