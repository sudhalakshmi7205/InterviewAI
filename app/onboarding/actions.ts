'use server'

import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function completeOnboarding(
  role: string, 
  level: string, 
  companies: string[], 
  languages: string[], 
  resumeText: string,
  goal: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress || 'unknown@example.com';
  
  const combinedRole = level && role ? `${level} ${role}` : role || 'Software Engineer';
  
  const { error } = await supabase.from('users').upsert({
    id: userId,
    email: email,
    target_role: combinedRole,
    experience: level,
    target_companies: companies,
    preferred_languages: languages,
    resume_text: resumeText || null,
    goal: goal
  });
  
  if (error) {
    console.error('Onboarding Error:', error);
    throw new Error('Failed to save profile');
  }
}
