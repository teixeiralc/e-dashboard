'use server'

import actionError from '@/lib/action-error'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
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
  revalidatePath('/dashboard', 'layout')
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

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user  ) {
      const { error: insertError } = await supabase.from('stores').insert([
        {
          user_id: user.id,
          name: `Loja do  ${user.email}`,
        },
      ])
      if (insertError) throw new Error(`Error creating store: ${insertError.message}`)
    }
  } catch (error) {
    return actionError(error)
  }
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}
