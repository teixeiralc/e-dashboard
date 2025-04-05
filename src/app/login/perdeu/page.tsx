import PerdeuForm from '@/components/auth/perdeu-form'
import ArrowLeftIcon from '@/components/ui/svg-icons/arrow-left-icon'
import Link from 'next/link'

export default function PerdeuPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white rounded-2xl p-6 min-[450px]:p-12 items-center justify-center gap-20">
        <Link href="/login" className="self-start -mb-10">
          <ArrowLeftIcon />
        </Link>
        <h1 className="font-title font-bold text-4xl mt-12">Perdeu a senha?</h1>
        <PerdeuForm />
        <p className="text-zinc-700 font-data text-xs self-start max-w-60 min-[500px]:max-w-full">
          Obs.: Um e-mail de recuperação de senha será enviado
        </p>
      </div>
    </main>
  )
}
