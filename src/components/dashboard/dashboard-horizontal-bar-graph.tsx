'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { IOrder } from '@/lib/types/db-types'

const chartConfig = {
  totalSales: {
    label: 'Total de Vendas: R$',
  },
} satisfies ChartConfig

export default function DashboardHorizontalBarGraph({ orders }: { orders: IOrder[] }) {
  const chartData = Array.from({ length: 3 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (2 - i))

    const month = date.toLocaleString('pt-BR', { month: 'short' })
    const year = date.getFullYear()

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.created_at)
      const isSameMonth = orderDate.getMonth() === date.getMonth()
      const isSameYear = orderDate.getFullYear() === year
      const isFinished = order.status === 'delivered'
      return isSameMonth && isSameYear && isFinished
    })

    const totalSales = filteredOrders.reduce((sum, order) => sum + order.total_price, 0)

    return {
      month: month.charAt(0).toUpperCase() + month.slice(1),
      totalSales,
    }
  })

  return (
    <Card className="text-sm sm:text-base">
      <CardHeader>
        <CardTitle>Vendas finalizadas por mês</CardTitle>
        <CardDescription>
          {chartData[0].month} - {chartData[chartData.length - 1].month}
        </CardDescription>
      </CardHeader>
      <CardContent className="sm:px-6 px-4">
        <ChartContainer config={chartConfig} className="max-h-[300px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
            width={20}
          >
            <XAxis type="number" dataKey="totalSales" hide />
            <YAxis dataKey="month" type="category" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="totalSales" fill="oklch(51.1% 0.096 186.391)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        <div className="leading-none text-muted-foreground">Mostrando total de vendas nos últimos 3 meses</div>
      </CardFooter>
    </Card>
  )
}
