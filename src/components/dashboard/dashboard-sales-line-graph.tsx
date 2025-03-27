'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { IOrder } from '@/lib/types/db-types'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const chartConfig = {
  delivered: {
    label: 'Aprovado',
    color: 'hsl(var(--chart-success))',
  },
  cancelled: {
    label: 'Cancelado',
    color: 'hsl(var(--chart-error))',
  },
  ongoing: {
    label: 'Em andamento',
    color: 'hsl(var(--chart-warning))',
  },
} satisfies ChartConfig

export default function DashboardSalesLineGraph({ orders }: { orders: IOrder[] }) {
  const chartOrdersData = orders.reduce((acc, order) => {
    const formattedDate = format(new Date(order.created_at), 'dd/MMM/yy', {
      locale: ptBR,
    })

    let record = acc.find((item) => item.date === formattedDate)
    if (!record) {
      record = { date: formattedDate, ongoing: 0, delivered: 0, cancelled: 0 }
      acc.push(record)
    }

    if (order.status === 'pending' || order.status === 'shipped') {
      record.ongoing += order.total_price
    } else {
      record[order.status] += order.total_price
    }

    return acc
  }, [] as { date: string; ongoing: number; delivered: number; cancelled: number }[])

  const sortedChartOrdersData = chartOrdersData.sort((a, b) => {
    const dateA = parse(a.date, 'dd/MMM/yy', new Date(), { locale: ptBR })
    const dateB = parse(b.date, 'dd/MMM/yy', new Date(), { locale: ptBR })
    return dateA.getTime() - dateB.getTime()
  })

  const filteredDateTitle =
    sortedChartOrdersData.length === 0
      ? 'Nenhuma venda nesta data'
      : `${sortedChartOrdersData[0].date} - ${sortedChartOrdersData[sortedChartOrdersData.length - 1].date}`

  return (
    <Card className="max-h-[calc(450px-4rem)]">
      <CardHeader>
        <CardTitle>Vendas por dia</CardTitle>
        <CardDescription>{filteredDateTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[280px] w-full">
          <LineChart
            accessibilityLayer
            data={sortedChartOrdersData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line dataKey="delivered" type="monotone" stroke="var(--color-success)" strokeWidth={2} dot={false} />
            <Line dataKey="cancelled" type="monotone" stroke="var(--color-error)" strokeWidth={2} dot={false} />
            <Line dataKey="ongoing" type="monotone" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
