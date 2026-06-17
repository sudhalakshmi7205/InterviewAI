import Link from 'next/link';
import { Terminal, Code2, BrainCircuit, FileText, CheckCircle2, ShieldAlert, LineChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50 max-w-7xl mx-auto left-0 right-0">
        <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          InterviewAI
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <Link href="/auth/sign-in" className="glass-panel px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors border border-slate-700/50">
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative pt-32 pb-20 animate-fade-in-up max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Llama 3.3 Engine Live
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl tracking-tight leading-[1.1] mb-8">
          Master your interviews with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI that pushes back.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
          Experience hyper-realistic behavioral and technical interviews. Featuring a live code execution sandbox, deep resume parsing, and enterprise-grade cheating detection.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/auth/sign-up" className="relative group overflow-hidden bg-blue-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-transform hover:scale-105 duration-300">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            Start Practicing Free
          </Link>
          <Link href="#features" className="px-8 py-4 rounded-full text-lg font-medium text-slate-300 hover:text-white transition-colors">
            Explore Features &rarr;
          </Link>
        </div>
        <p className="text-sm text-slate-500 mt-6 font-medium">No credit card required &middot; 3 free sessions</p>

        {/* Hero Image / Mockup */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
          <div className="glass-panel rounded-t-3xl border-t border-x border-slate-700/50 p-2 transform rotateX-12 shadow-[0_-20px_60px_-15px_rgba(59,130,246,0.3)]">
            <div className="bg-slate-900 rounded-2xl overflow-hidden flex border border-slate-800">
              {/* Fake Sidebar */}
              <div className="w-16 bg-slate-950 border-r border-slate-800 p-4 flex flex-col gap-4 items-center hidden md:flex">
                <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center"><Terminal size={16}/></div>
                <div className="w-8 h-8 rounded text-slate-600 flex items-center justify-center"><Code2 size={16}/></div>
                <div className="w-8 h-8 rounded text-slate-600 flex items-center justify-center"><LineChart size={16}/></div>
              </div>
              {/* Fake Editor */}
              <div className="flex-1 p-6 bg-[#0d1117] font-mono text-sm leading-relaxed text-slate-300 text-left">
                <div className="text-slate-500 mb-4">// Live Code Execution Environment</div>
                <div><span className="text-pink-400">function</span> <span className="text-blue-400">reverseLinkedList</span>(head) {'{'}</div>
                <div className="pl-4"><span className="text-pink-400">let</span> prev = <span className="text-orange-400">null</span>;</div>
                <div className="pl-4"><span className="text-pink-400">let</span> current = head;</div>
                <br/>
                <div className="pl-4"><span className="text-pink-400">while</span> (current !== <span className="text-orange-400">null</span>) {'{'}</div>
                <div className="pl-8"><span className="text-pink-400">const</span> next = current.next;</div>
                <div className="pl-8">current.next = prev;</div>
                <div className="pl-8">prev = current;</div>
                <div className="pl-8">current = next;</div>
                <div className="pl-4">{'}'}</div>
                <div className="pl-4"><span className="text-pink-400">return</span> prev;</div>
                <div>{'}'}</div>
                <br/>
                <div className="flex gap-2 items-center mt-4 border-t border-slate-800 pt-4">
                  <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold border border-emerald-500/30">Console Output</div>
                  <div className="text-emerald-400 text-xs">&gt; Passed all 15 test cases. Runtime: 42ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-10 border-y border-slate-800/50 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by engineers who landed offers at</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake logos using text for now, but stylized */}
            <div className="text-2xl font-black tracking-tighter">Google</div>
            <div className="text-2xl font-bold tracking-tight">Meta</div>
            <div className="text-2xl font-black text-red-500 tracking-wider">NETFLIX</div>
            <div className="text-2xl font-extrabold italic">Amazon</div>
          </div>
        </div>
      </section>

      {/* Bento Box Features Section */}
      <section className="py-32 px-4 relative z-10" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Architecture</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">We didn't just build a chatbot. We built a comprehensive technical assessment platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Bento 1: Code Editor (Spans 2 columns) */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 md:col-span-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors"></div>
              <Code2 className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Live Code Execution Sandbox</h3>
              <p className="text-slate-400 max-w-md">Integrated Monaco Editor with Piston API. Compile and run Python, JS, Java, and C++ directly in the browser while the AI analyzes your logic in real-time.</p>
            </div>

            {/* Bento 2: Resume Parsing */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-colors"></div>
              <FileText className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Dynamic Resume Parsing</h3>
              <p className="text-slate-400">Upload your resume and the AI will interrogate you on your specific past experiences.</p>
            </div>

            {/* Bento 3: Cheating Detection */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] group-hover:bg-red-500/20 transition-colors"></div>
              <ShieldAlert className="w-10 h-10 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Anti-Cheat Engine</h3>
              <p className="text-slate-400">Client-side WebAssembly facial tracking and tab-switching detection to ensure interview integrity.</p>
            </div>

            {/* Bento 4: Sentiment Analytics (Spans 2 columns) */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-700/50 md:col-span-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors"></div>
              <BrainCircuit className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Sentiment & Confidence Analytics</h3>
              <p className="text-slate-400 max-w-md mb-6">Our AI doesn't just grade what you say—it grades *how* you say it. It analyzes your linguistic tone and provides a precise confidence score for every single answer.</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[92%]"></div></div>
                <span className="text-emerald-400 font-bold text-sm">9.2 / 10 Confidence</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial Marquee */}
      <section className="py-20 border-y border-slate-800/50 bg-slate-900/30 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel border border-slate-700/50 p-6 rounded-2xl w-96 flex-shrink-0 inline-block whitespace-normal">
              <div className="flex items-center gap-2 mb-4 text-yellow-500">
                <CheckCircle2 className="w-5 h-5 fill-yellow-500 text-slate-900" />
                <span className="font-bold text-sm text-slate-300">Verified User</span>
              </div>
              <p className="text-slate-300 italic">"The Llama 3 engine is incredibly tough. It dug into my resume and grilled me on Kafka architecture. It genuinely prepared me for my Meta systems design round."</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 px-4 relative z-10" id="pricing">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg mb-20 max-w-xl mx-auto">Land your dream job faster. Choose the plan that works best for your interview timeline.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-10 rounded-3xl flex flex-col h-full border border-slate-800/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Free Plan</h3>
              <div className="text-5xl font-black mb-8 text-white">$0<span className="text-lg text-slate-500 font-medium">/forever</span></div>
              <ul className="space-y-4 mb-10 text-slate-400 flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  3 AI interviews per month
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  Voice & text support
                </li>
              </ul>
              <Link href="/auth/sign-up" className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold transition-colors mt-auto">
                Start Free
              </Link>
            </div>

            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-blue-500 to-purple-600 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] transform md:-translate-y-4 hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg z-20">
                Recommended
              </div>
              <div className="bg-slate-900 p-10 rounded-[23px] flex flex-col h-full relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">$12<span className="text-lg text-slate-500 font-medium">/month</span></div>
                <ul className="space-y-4 mb-10 text-slate-300 flex-1">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                    <span className="font-medium text-white">Unlimited</span> AI interviews
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                    Live Code Execution Sandbox
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                    Dynamic Resume Parsing
                  </li>
                </ul>
                <Link href="/auth/sign-up" className="relative block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold transition-colors shadow-lg mt-auto overflow-hidden group">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="font-extrabold text-white text-xl flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-500" />
            InterviewAI
          </div>
          <div>&copy; {new Date().getFullYear()} InterviewAI. Built for enterprise. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
