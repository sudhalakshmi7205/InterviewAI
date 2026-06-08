import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          InterviewAI
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <Link href="/auth/sign-in" className="glass-panel px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
          Sign In
        </Link>
      </header>

      {/* Section 1 - Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative pt-20 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Llama 3.3 Engine Live
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black max-w-5xl tracking-tight leading-[1.1] mb-8">
          Master your interviews with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI that pushes back.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
          Experience hyper-realistic behavioral and technical interviews. Get real-time cheating detection, deep sentiment analysis, and a brutal feedback report.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/auth/sign-up" className="relative group overflow-hidden bg-blue-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-transform hover:scale-105 duration-300">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            Start Practicing Free
          </Link>
          <Link href="#how-it-works" className="px-8 py-4 rounded-full text-lg font-medium text-slate-300 hover:text-white transition-colors">
            View Demo &rarr;
          </Link>
        </div>
        <p className="text-sm text-slate-500 mt-6 font-medium">No credit card required &middot; 3 free sessions</p>
      </section>

      {/* Section 2 - How It Works (Glassmorphic Panels) */}
      <section className="py-32 px-4 relative z-10" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">A seamless, terrifyingly accurate simulation of a real enterprise interview.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel glass-panel-glow p-8 rounded-3xl animate-float" style={{ animationDelay: '0s' }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xl mb-6 shadow-inner">01</div>
              <h3 className="font-bold text-2xl text-white mb-4">Select Your Role</h3>
              <p className="text-slate-400 leading-relaxed">Choose from Software Engineer, Product Manager, or Designer. Select your exact seniority level to calibrate the AI's difficulty.</p>
            </div>
            <div className="glass-panel glass-panel-glow p-8 rounded-3xl animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl mb-6 shadow-inner">02</div>
              <h3 className="font-bold text-2xl text-white mb-4">The Live Interview</h3>
              <p className="text-slate-400 leading-relaxed">Speak directly into your microphone. The AI uses Llama 3 to analyze your words instantly and hit you with highly specific follow-up questions.</p>
            </div>
            <div className="glass-panel glass-panel-glow p-8 rounded-3xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xl mb-6 shadow-inner">03</div>
              <h3 className="font-bold text-2xl text-white mb-4">Deep Analytics</h3>
              <p className="text-slate-400 leading-relaxed">Instantly receive a comprehensive dashboard breaking down your Sentiment, Confidence, Technical Depth, and exact areas for improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Futuristic Dashboard Showcase */}
      <section className="py-32 px-4 relative z-10" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel rounded-[2.5rem] p-1 border border-slate-800 shadow-2xl">
            <div className="bg-slate-950 rounded-[2.25rem] overflow-hidden">
              {/* Fake Mac Toolbar */}
              <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start relative">
                {/* Radial glow behind dashboard */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold mb-8 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    Overall Score: 8.5 / 10
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Sentiment & Confidence Engine</h3>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    Our AI doesn't just grade what you say—it grades *how* you say it. It detects filler words, analyzes your linguistic tone, and provides a precise confidence score for every single answer.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="flex justify-between text-sm mb-2 font-bold text-slate-300">
                        <span>Confidence Score</span>
                        <span className="text-emerald-400">9.0/10</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full w-[90%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div></div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="flex justify-between text-sm mb-2 font-bold text-slate-300">
                        <span>Technical Depth</span>
                        <span className="text-yellow-400">7.5/10</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full w-[75%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div></div>
                    </div>
                  </div>
                </div>
                
                {/* Face Tracking Demo Card */}
                <div className="w-full md:w-80 glass-panel rounded-2xl p-6 relative z-10">
                  <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-6">Security Module</h4>
                  <div className="aspect-video bg-slate-900 rounded-lg mb-6 relative overflow-hidden border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    {/* Fake webcam image/overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-red-500 border-dashed rounded opacity-50 animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Warning: 2 Faces Detected
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Enterprise-grade cheat detection. We run local AI models in your browser to detect multiple faces, missing faces, and tab switching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Pricing */}
      <section className="py-32 px-4 relative z-10" id="pricing">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg mb-20 max-w-xl mx-auto">Land your dream job faster. Choose the plan that works best for your interview timeline.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            
            {/* Free Tier */}
            <div className="glass-panel p-10 rounded-3xl flex flex-col h-full border border-slate-800/50">
              <h3 className="text-2xl font-bold mb-2 text-white">Free Plan</h3>
              <div className="text-5xl font-black mb-8 text-white">$0<span className="text-lg text-slate-500 font-medium">/forever</span></div>
              <ul className="space-y-4 mb-10 text-slate-400 flex-1">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                  3 AI interviews per month
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                  Voice & text support
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                  Basic scorecard
                </li>
              </ul>
              <Link href="/auth/sign-up" className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold transition-colors mt-auto">
                Start Free
              </Link>
            </div>

            {/* Pro Tier */}
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
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                    <span className="font-medium text-white">Unlimited</span> AI interviews
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                    Cheating detection engine
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                    Deep sentiment & confidence analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"><svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                    Video recording playback
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
            <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            InterviewAI
          </div>
          <div className="flex gap-8 font-medium">
            <Link href="#how-it-works" className="hover:text-white transition-colors">About</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
