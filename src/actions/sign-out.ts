'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()

  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  } catch (error) {
    return actionError(error)
  }
  redirect('/login')
}
