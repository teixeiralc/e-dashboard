'use client'

import Link from 'next/link'
import WidgetCard from '../ui/widget-card'
import PlusIcon from '../ui/svg-icons/plus-icon'
import AddProduct from '../add-product'
import { CircleDollarSign, PackageSearch } from 'lucide-react'

export default function DashboardActions() {
  return (
    <WidgetCard className="flex items-center justify-evenly">
      <AddProduct>
        <button className="uppercase text-zinc-900 font-body text-xs flex flex-col items-center justify-center gap-2 cursor-pointer">
          <div className="p-4 bg-teal-700 hover:bg-teal-900 ease-in-out duration-200 rounded-xl relative">
            <PackageSearch className="text-teal-300 h-10 w-10" />
            <span className="absolute right-[5px] bottom-1">
              <PlusIcon />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <p>Novo</p>
            <p>produto</p>
          </div>
        </button>
      </AddProduct>
      <Link
        href={'/dashboard/vendas/adicionar'}
        className="uppercase text-zinc-900 font-body text-xs flex flex-col items-center justify-center gap-2"
      >
        <div className="p-4 bg-teal-700 hover:bg-teal-900 ease-in-out duration-200 rounded-xl relative">
          <CircleDollarSign className="text-teal-300 h-10 w-10" />
          <span className="absolute right-[5px] bottom-1">
            <PlusIcon />
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p>nova</p>
          <p>venda</p>
        </div>
      </Link>
    </WidgetCard>
  )
}
