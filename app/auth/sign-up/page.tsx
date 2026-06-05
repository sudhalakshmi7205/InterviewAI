import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center mt-20 min-h-screen">
      <SignUp signInUrl="/auth/sign-in" forceRedirectUrl="/onboarding" />
    </div>
  );
}
