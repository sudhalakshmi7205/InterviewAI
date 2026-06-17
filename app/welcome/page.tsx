'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { checkOnboardingStatus } from './actions'

export default function WelcomePage() {
  const router = useRouter()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function routeUser() {
      // Small artificial delay for the premium "Preparing Workspace" feel
      await new Promise(r => setTimeout(r, 2500));
      
      const hasCompletedOnboarding = await checkOnboardingStatus(user.id);
      if (hasCompletedOnboarding) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    }

    routeUser();
  }, [isLoaded, user, router])

  if (!isLoaded || !user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle pulse background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{user.firstName}</span> 👋
        </h1>
        
        <div className="flex items-center gap-4 text-slate-400 font-mono text-sm border border-slate-800 bg-slate-900/50 px-6 py-3 rounded-full">
          <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          Preparing your workspace...
        </div>
      </div>
    </div>
  )
}
