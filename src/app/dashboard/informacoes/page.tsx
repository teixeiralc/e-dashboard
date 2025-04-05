import BaseCard from '@/components/ui/base-card'
import UsefulLinks from '@/components/useful-links'
import Link from 'next/link'

export async function generateMetadata() {
  return {
    title: `Informações | e-Dashboard`,
  }
}

export default function InformacoesPage() {
  return (
    <main>
      <BaseCard className="mt-4 sm:mt-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-3xl sm:text-5xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-8">
            Informações
          </h1>
          <h2 className="text-xl sm:text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-2">
            Sobre o projeto
          </h2>
          <p className="text-zinc-700 tracking-tight mb-8 text-base">
            Este projeto é um painel administrativo de e-commerce desenvolvido com <b>Next.js 15</b>, <b>React</b>,{' '}
            <b>Tailwind CSS</b>, <b>ShadCN</b> e <b>Supabase</b>.
            <br />
            Ele permite que usuários gerenciem produtos, pedidos e visualizem estatísticas de sua loja virtual.
          </p>
          <h2 className="text-xl sm:text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-2">
            Funcionalidades Principais
          </h2>
          <ul className="space-y-3 sm:space-y-1 text-zinc-700 text-base mb-8">
            <li className="flex items-start">
              <p className="font-medium">
                Autenticação: <span className="font-normal">Login, cadastro e reset de senha via Supabase Auth.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Gestão de Produtos:{' '}
                <span className="font-normal">Visualização, criação, edição e remoção de produtos.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Gerenciamento de Pedidos: <span className="font-normal">Visualização e controle de pedidos.</span>
              </p>
            </li>
            <li className="flex items-start">
              <p className="font-medium">
                Estatísticas: <span className="font-normal">Gráfico sobre vendas.</span>
              </p>
            </li>
          </ul>
          <h2 className="text-xl sm:text-2xl text-zinc-900 font-bold uppercase font-title drop-shadow-md mb-4">
            Links Úteis
          </h2>
          <UsefulLinks />
        </div>
        <Link
          className="text-zinc-500 font-data text-xs underline self-start hover:text-teal-600"
          href={`https://www.linkedin.com/in/lucascteixeira0/`}
          target="_blank"
        >
          Projeto feito inteiramente por mim, do design ao código.
        </Link>
      </BaseCard>
    </main>
  )
}
