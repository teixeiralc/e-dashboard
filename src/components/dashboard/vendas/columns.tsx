'use client'

import { Button } from '@/components/ui/button'
import { IFormattedOrder } from '@/lib/types/db-types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export const ordersColumns: ColumnDef<IFormattedOrder>[] = [
  {
    accessorKey: 'id',
    size: 120,
    header: () => (
      <Button className="px-0 py-0 has-[>svg]:px-0" variant="ghost">
        ID
      </Button>
    ),
    cell: ({ row }) => {
      const order = row.original

      return (
        <Link href={`/dashboard/vendas/${order.id}`} prefetch={false} className="hover:underline">
          {order.id.length > 10 ? `${order.id.slice(0, 10)}...` : order.id}
        </Link>
      )
    },
  },
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Produto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const order = row.original

      return <div>{order.product.length > 16 ? `${order.product.slice(0, 16)}...` : order.product}</div>
    },
    size: 150,
  },
  {
    accessorKey: 'customer_email',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Cliente
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 150,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Quantidade
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const order = row.original
      return <div className="text-center">{order.quantity}</div>
    },
    size: 120,
  },
  {
    accessorKey: 'total_price',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Valor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue('total_price'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(totalPrice)

      return <div>{formatted}</div>
    },
    size: 180,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 160,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button
        className="px-0 py-0 has-[>svg]:px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Data
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = String(row.getValue('created_at'))
      const formatted = format(new Date(createdAt), 'dd/MMM/yyyy', { locale: ptBR })
      return <div>{formatted}</div>
    },
    size: 160,
  },
]
