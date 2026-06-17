import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <Terminal className="w-6 h-6 text-white" />
        <span className="font-bold text-white text-xl tracking-tight">InterviewAI</span>
      </Link>
      
      <div className="w-full max-w-md animate-fade-in-up">
        <SignUp 
          appearance={{ baseTheme: dark }} 
          signInUrl="/auth/sign-in" 
          forceRedirectUrl="/onboarding" 
        />
      </div>
    </div>
  );
}
