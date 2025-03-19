'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(state: object, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!email || !password) throw new Error('Preencha os dados corretamente.')
    const data = {
      email,
      password,
    }
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw new Error('Credenciais inválidas.')
  } catch (error) {
    return actionError(error)
  }
  redirect('/dashboard')
}

export async function signup(state: object, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!email || !password) throw new Error('Preencha os dados corretamente.')
    if (password.length < 6) throw new Error('A senha deve ter no mínimo 6 caracteres.')

    const data = {
      email,
      password,
    }
    const { error } = await supabase.auth.signUp(data)

    if (error) throw new Error(error.message)
  } catch (error) {
    return actionError(error)
  }
  redirect('/dashboard')
}
