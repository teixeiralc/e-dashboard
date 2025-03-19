'use client'

import LoginForm from '@/components/auth/login-form'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      toast('Nao quer criar uma conta?', {
        description: 'Utilize admin@email.com e a senha @admin.',
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
      <div className="flex flex-col bg-base-1 rounded-2xl p-12 items-center justify-center gap-20">
        <h1 className="font-title font-bold text-4xl mt-12">e-Dashboard</h1>
        <LoginForm />
        <Link className="text-base-4 font-data text-xs underline self-start hover:text-prim-3" href={'/'}>
          Perdeu a senha?
        </Link>
      </div>
    </main>
  )
}
