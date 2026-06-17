'use server'

import { supabase } from '@/lib/supabase';

export async function checkOnboardingStatus(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('target_role')
    .eq('id', userId)
    .single();

  return !!user?.target_role;
}
