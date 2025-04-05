'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export default function ResetarForm({
  token,
  email,
  type,
}: {
  token: string | null
  email: string | null
  type: string | null
}) {
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')

  async function updatePassword() {
    setLoading(true)
    if (password !== confirmedPassword) {
      toast.error('Não foi possível alterar sua senha', {
        description: 'As senhas não coincidem',
      })
      setPassword('')
      setConfirmedPassword('')
      setLoading(false)
      return
    }

    if (token && email && type && type.toLocaleLowerCase() === 'recovery') {
      const {
        data: { user },
        error: verifyError,
      } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

      if (!user && verifyError) {
        toast.error('Aconteceu algo de errado', {
          description: verifyError.message,
        })
        setPassword('')
        setConfirmedPassword('')
        setLoading(false)
        return
      }
      const { data, error: updateError } = await supabase.auth.updateUser({ password: password })
      if (data) {
        toast.success('Senha alterada com sucesso')
        setLoading(false)
        redirect('/login')
      }
      if (updateError) {
        toast.error('Aconteceu algo de errado', {
          description: updateError.message,
        })
        setPassword('')
        setConfirmedPassword('')
        setLoading(false)
      }
    }
  }

  return (
    <form action={updatePassword} className="flex flex-col gap-2 min-[400px]:gap-4 w-60 min-[450px]:w-80">
      <div>
        <Label htmlFor="password" className="mb-1">
          Senha -
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          placeholder="sua nova senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-1">
          Confirme sua senha -
        </Label>
        <Input
          type="password"
          id="confirmed_password"
          name="confirmed_password"
          required
          placeholder="sua nova senha"
          value={confirmedPassword}
          onChange={({ target }) => setConfirmedPassword(target.value)}
        />
      </div>
      <div className="flex self-end gap-4">
        <Button
          type="submit"
          disabled={loading}
          className={
            'bg-zinc-800 text-teal-400 font-body uppercase font-bold text-base hover:text-white drop-shadow-md'
          }
        >
          {loading ? 'Resetando... ' : 'Resetar senha'}
        </Button>
      </div>
    </form>
  )
}
