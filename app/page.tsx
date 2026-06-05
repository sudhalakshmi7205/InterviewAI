import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black overflow-x-hidden">
      
      {/* Section 1 - Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10" />
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight">
          Practice interviews with an AI that actually <span className="text-blue-600">pushes back</span>
        </h1>
        <p className="text-xl text-gray-500 mt-6 max-w-xl">
          Get real follow-up questions, honest feedback, and a score after every session.
          No recruiters. No judgment. Just practice.
        </p>
        <Link href="/auth/sign-up" className="mt-8 bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 shadow-xl shadow-gray-200 duration-300">
          Start Practicing Free
        </Link>
        <p className="text-sm text-gray-400 mt-4 font-medium">No credit card required &middot; 3 free sessions</p>
      </section>

      {/* Section 2 - How It Works */}
      <section className="py-24 px-4 bg-white" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">1</div>
              <h3 className="font-bold text-xl mb-3">Pick your role</h3>
              <p className="text-gray-500 leading-relaxed">Pick your role — Software Engineer, Product Manager, or Designer.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">2</div>
              <h3 className="font-bold text-xl mb-3">Answer questions</h3>
              <p className="text-gray-500 leading-relaxed">Answer questions out loud or by typing — the AI asks real follow-ups based on what you say.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">3</div>
              <h3 className="font-bold text-xl mb-3">Get your scorecard</h3>
              <p className="text-gray-500 leading-relaxed">Get your scorecard — communication, depth, structure, and what you should have said.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Sample Feedback Card */}
      <section className="py-32 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Real feedback, instantly.</h2>
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-200 p-8 md:p-12 transition-transform hover:-translate-y-1 duration-500">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-6 border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Communication Score: 85/100
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Interviewer Note</h3>
                <p className="text-gray-600 italic mb-8 border-l-4 border-blue-500 pl-5 py-1 text-lg leading-relaxed">
                  "You did a great job explaining the initial system architecture, but you hesitated when I asked how it scales to 1M requests per second. Your answer lacked specifics on database sharding."
                </p>
                <h3 className="text-xl font-bold mb-3 text-blue-600">What you should have said:</h3>
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed">
                    "To handle 1M RPS, we would implement a caching layer with Redis to absorb read-heavy traffic, and shard the Postgres database based on user ID to distribute the write load..."
                  </p>
                </div>
              </div>
              <div className="w-full md:w-72 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-6">Metrics</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-gray-700">Depth</span>
                      <span className="text-gray-900">70%</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full w-[70%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-gray-700">Structure</span>
                      <span className="text-gray-900">90%</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full w-[90%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-gray-700">Clarity</span>
                      <span className="text-gray-900">85%</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full w-[85%]"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why candidates use us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-8 rounded-3xl">
              <div className="text-yellow-400 flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-gray-700 mb-8 leading-relaxed">"Got an offer at Stripe after 2 weeks of practice. The AI pushed back on my system design answers exactly like the real interviewers did."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">S</div>
                <div>
                  <div className="font-bold text-gray-900">Sarah T.</div>
                  <div className="text-xs text-gray-500">Senior Backend Engineer</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-8 rounded-3xl">
              <div className="text-yellow-400 flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-gray-700 mb-8 leading-relaxed">"I bomb interviews because I ramble. The structure scores forced me to use the STAR method. Finally landed a PM role at a Series B startup."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">M</div>
                <div>
                  <div className="font-bold text-gray-900">Michael C.</div>
                  <div className="text-xs text-gray-500">Product Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-8 rounded-3xl">
              <div className="text-yellow-400 flex gap-1 mb-6 text-xl">★★★★★</div>
              <p className="text-gray-700 mb-8 leading-relaxed">"Practicing out loud is completely different from reading questions online. The voice mode makes it feel terrifyingly real, in a good way."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold">E</div>
                <div>
                  <div className="font-bold text-gray-900">Elena R.</div>
                  <div className="text-xs text-gray-500">Frontend Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Pricing */}
      <section className="py-32 px-4 bg-gray-950 text-white" id="pricing">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-gray-400 mb-16 max-w-xl mx-auto">No hidden fees. Choose the plan that works best for your interview prep timeline.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            
            <div className="bg-gray-900 p-10 rounded-3xl border border-gray-800 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-extrabold mb-8">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-5 mb-10 text-gray-300 flex-1">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  3 sessions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Text only
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Basic feedback
                </li>
              </ul>
              <Link href="/auth/sign-up" className="block w-full text-center bg-gray-800 hover:bg-gray-700 py-4 rounded-xl font-semibold transition-colors mt-auto">
                Start Free
              </Link>
            </div>

            <div className="bg-gradient-to-b from-blue-900 to-gray-900 p-10 rounded-3xl border border-blue-500 relative shadow-2xl flex flex-col h-full transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                Recommended
              </div>
              <h3 className="text-2xl font-bold mb-2 text-blue-100">Pro</h3>
              <div className="text-4xl font-extrabold mb-8 text-white">$12<span className="text-lg text-blue-300 font-normal">/mo</span></div>
              <ul className="space-y-5 mb-10 text-blue-100 flex-1">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Unlimited sessions
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Webcam + voice
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Full scorecard + replay
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Shareable report link
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Priority AI
                </li>
              </ul>
              <Link href="/auth/sign-up" className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-colors shadow-lg mt-auto">
                Upgrade to Pro
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Section 6 - Footer */}
      <footer className="bg-black text-gray-500 py-12 px-4 border-t border-gray-900 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center font-bold text-white text-xl">
            InterviewAI
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#how-it-works" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
          <div>
            &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
