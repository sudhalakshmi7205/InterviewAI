'use server'

import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function saveRole(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const role = formData.get('role');
  if (!role) {
    throw new Error('Role is required');
  }

  const { error } = await supabase
    .from('users')
    .update({ target_role: role.toString() })
    .eq('id', userId);

  if (error) {
    console.error('Error saving role:', error);
    throw new Error('Failed to save role');
  }

  redirect('/dashboard');
}
