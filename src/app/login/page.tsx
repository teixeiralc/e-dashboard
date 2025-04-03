'use client'

import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      toast('Nao quer criar uma conta?', {
        description: 'Utilize admin@email e a senha @admin',
        action: {
          label: 'Ok!',
          onClick: () => null,
        },
        duration: 10000,
      })
    }, 0)
    return () => clearTimeout(toastTimeout)
  }, [])

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white rounded-2xl p-12 items-center justify-center gap-20">
        <h1 className="font-title font-bold text-4xl mt-12">e-Dashboard</h1>
        <LoginForm />
        <Link
          className="text-zinc-500 font-data text-xs underline self-start hover:text-teal-600"
          href={'/login/perdeu'}
        >
          Perdeu a senha?
        </Link>
      </div>
    </main>
  )
}
