import Link from 'next/link';
import { Terminal, Code2, BrainCircuit, FileText, CheckCircle2, ShieldAlert, LineChart, PlayCircle, ChevronDown } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

function CTAButton({ className, children }: { className: string, children: React.ReactNode }) {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/welcome">
          <button className={className}>{children}</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" className={className}>
          {children}
        </Link>
      </SignedIn>
    </>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[128px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 1. Navbar */}
      <header className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          InterviewAI
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/welcome">
              <button className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Log in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Dashboard</Link>
          </SignedIn>
          
          <CTAButton className="glass-panel px-5 py-2.5 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors border border-slate-700/50 flex items-center justify-center">
            Start Free Interview
          </CTAButton>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative pt-32 pb-20 animate-fade-in-up max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl tracking-tight leading-[1.1] mb-8 mt-10">
          Crack the interview.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Land the offer.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
          Experience hyper-realistic behavioral and technical interviews. Featuring a live code execution sandbox, deep resume parsing, and enterprise-grade cheating detection.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CTAButton className="relative group overflow-hidden bg-white text-[#0a0a0a] font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center justify-center">
            Start Free Interview
          </CTAButton>
        </div>
        <p className="text-sm text-slate-500 mt-6 font-medium">No credit card required &middot; 3 free sessions</p>
      </section>

      {/* 3. Trusted By */}
      <section className="py-10 border-y border-slate-800/50 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Candidates hired at</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black tracking-tighter">Google</div>
            <div className="text-2xl font-bold tracking-tight">Meta</div>
            <div className="text-2xl font-black text-red-500 tracking-wider">NETFLIX</div>
            <div className="text-2xl font-extrabold italic">Amazon</div>
          </div>
        </div>
      </section>

      {/* 4. Demo Video */}
      <section className="py-32 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See it in action</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Watch how the Llama 3 engine grills candidates in real-time.</p>
        </div>
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-panel border border-slate-700/50 flex items-center justify-center group cursor-pointer shadow-[0_0_50px_-15px_rgba(59,130,246,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 opacity-80 z-0"></div>
          <PlayCircle className="w-20 h-20 text-white/50 group-hover:text-white group-hover:scale-110 transition-all z-10" />
          <div className="absolute bottom-6 left-6 z-10 text-slate-300 font-mono text-sm border-l-2 border-blue-500 pl-4 hidden md:block">
            <div className="text-blue-400 mb-1">AI Interviewer</div>
            "Let's dive into your work at Stripe. Can you explain how you designed the idempotency layer?"
          </div>
        </div>
      </section>

      {/* 5. Features (Bento Box) */}
      <section className="py-20 px-4 relative z-10" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Architecture</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 md:col-span-2 relative overflow-hidden group">
              <Code2 className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Live Code Sandbox</h3>
              <p className="text-slate-400 max-w-md">Compile and run Python, JS, Java, and C++ directly in the browser while the AI analyzes your logic in real-time.</p>
            </div>
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden group">
              <FileText className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Resume Parsing</h3>
              <p className="text-slate-400">The AI interrogates you on your specific past experiences.</p>
            </div>
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden group">
              <ShieldAlert className="w-10 h-10 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Anti-Cheat Engine</h3>
              <p className="text-slate-400">Wasm facial tracking and tab-switching detection.</p>
            </div>
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 md:col-span-2 relative overflow-hidden group">
              <BrainCircuit className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Sentiment Analytics</h3>
              <p className="text-slate-400 max-w-md mb-6">Our AI grades *how* you say it. It analyzes your linguistic tone and provides a precise confidence score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="py-32 bg-slate-900/30 border-y border-slate-800/50" id="how-it-works">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-black text-2xl mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Upload Resume</h3>
              <p className="text-slate-400">We instantly build a custom AI profile tailored to your specific background.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-2xl mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">The Interview</h3>
              <p className="text-slate-400">Enter the Zoom-style lobby and face off against a merciless AI interviewer.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-2xl mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Get Evaluated</h3>
              <p className="text-slate-400">Receive an incredibly detailed report scoring your code, communication, and behavior.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-32 px-4 overflow-hidden relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">Don't take our word for it</h2>
        </div>
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-panel border border-slate-700/50 p-6 rounded-2xl w-[400px] flex-shrink-0 inline-block whitespace-normal">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-sm text-slate-300">Software Engineer, Meta</span>
              </div>
              <p className="text-slate-300 italic">"The Llama 3 engine is incredibly tough. It dug into my resume and grilled me on Kafka architecture. It genuinely prepared me for my systems design round."</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Pricing */}
      <section className="py-32 px-4 bg-slate-900/30 border-y border-slate-800/50" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="glass-panel p-10 rounded-3xl border border-slate-800 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-5xl font-black mb-8">$0</div>
              <ul className="space-y-4 mb-10 text-slate-400 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> 3 AI interviews</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Basic Analytics</li>
              </ul>
              <CTAButton className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold transition-colors mt-auto flex items-center justify-center">
                Start Free Interview
              </CTAButton>
            </div>
            <div className="glass-panel p-10 rounded-3xl border border-blue-500/50 bg-blue-900/10 flex flex-col relative">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Pro</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-5xl font-black mb-8 text-blue-400">$12<span className="text-lg text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-10 text-slate-300 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited interviews</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Live Code Sandbox</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Resume Parsing</li>
              </ul>
              <CTAButton className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-colors mt-auto flex items-center justify-center">
                Start Free Interview
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-32 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center font-bold">What languages do you support? <ChevronDown size={20} className="text-slate-500"/></div>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center font-bold">Is the code actually compiled? <ChevronDown size={20} className="text-slate-500"/></div>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center font-bold">How does the Anti-Cheat work? <ChevronDown size={20} className="text-slate-500"/></div>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="border-t border-slate-800 bg-[#0a0a0a] py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="font-extrabold text-white text-xl flex items-center gap-2">
            <Terminal className="w-5 h-5 text-white" />
            InterviewAI
          </div>
          <div>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
