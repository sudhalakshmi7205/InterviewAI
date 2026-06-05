import { saveRole } from './actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect('/auth/sign-in');

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome to InterviewAI</h1>
        <p className="text-gray-600 mb-8">To customize your experience, tell us what role you are practicing for.</p>
        
        <form action={saveRole} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">Target Role</label>
            <select 
              id="role" 
              name="role" 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-4"
              required
              defaultValue=""
            >
              <option value="" disabled>Select a role...</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Designer">Designer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full text-white bg-black hover:bg-gray-800 font-bold rounded-xl text-lg px-5 py-4 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
