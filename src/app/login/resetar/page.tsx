import ResetarForm from '@/components/auth/resetar-form'

interface IResetarPageParams {
  searchParams: Promise<{
    confirmation_url: string
  }>
}

export default async function ResetarPage({ searchParams }: IResetarPageParams) {
  const currSearchParams = await searchParams
  const confirmationUrl = currSearchParams.confirmation_url

  const decodedUrl = decodeURIComponent(confirmationUrl)
  const innerConfirmationUrlParams = new URLSearchParams(decodedUrl)

  // supabase sends a URL that looks like this:
  // {{ .SiteURL }}/login/resetar?confirmation_url={{ .ConfirmationURL }}%26token%3d{{ .Token}}%26email%3d{{ .Email}}
  // therefore, it's needed to decode the url and get the inner params

  const token = innerConfirmationUrlParams.get('token')
  const email = innerConfirmationUrlParams.get('email')
  const type = innerConfirmationUrlParams.get('type') // type === 'recovery', in this case

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-white rounded-2xl p-12 items-center justify-center gap-20">
        <h1 className="font-title font-bold text-4xl mt-12">Resete sua senha</h1>
        <ResetarForm token={token} email={email} type={type} />
        <p className="text-zinc-700 font-data text-xs self-start ">Obs.: As senhas precisam coincidir</p>
      </div>
    </main>
  )
}
