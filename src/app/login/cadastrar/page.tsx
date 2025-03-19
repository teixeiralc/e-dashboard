import SignUpForm from '@/components/auth/signup-form'

export default async function LoginCadastrarPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-base-1 rounded-2xl p-12 items-center justify-center gap-20">
        <h1 className="font-title font-bold text-4xl mt-12">Cadastre-se</h1>
        <SignUpForm />
        <p className="text-base-4 font-data text-xs self-start hover:text-prim-3">
          Obs.: Não será necessário confirmar o e-mail.
        </p>
      </div>
    </main>
  )
}
