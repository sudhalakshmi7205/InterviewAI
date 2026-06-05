import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black py-20 px-4">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 text-lg mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mb-4">
            This is a placeholder for the Terms of Service. You must update this with your actual terms of service before enabling Google OAuth in Clerk.
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
