'use server'

import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function completeOnboarding(role: string, level: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress || 'unknown@example.com';
  
  const combinedRole = level && role ? `${level} ${role}` : role || 'Software Engineer';
  
  const { error } = await supabase.from('users').upsert({
    id: userId,
    email: email,
    target_role: combinedRole
  });
  
  if (error) {
    console.error('Onboarding Error:', error);
    throw new Error('Failed to save profile');
  }
}
