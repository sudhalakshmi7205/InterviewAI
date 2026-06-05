import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex justify-center mt-20 min-h-screen">
      <SignIn signUpUrl="/auth/sign-up" forceRedirectUrl="/dashboard" />
    </div>
  );
}
