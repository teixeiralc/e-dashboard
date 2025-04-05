'use client'

import { useEffect, useState } from 'react'
import WidgetCard from '../ui/widget-card'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import CalendarIcon from '../ui/svg-icons/calendar-icon'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { DateRange } from 'react-day-picker'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DashboardDateFilter() {
  const today = new Date()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  })

  const [paramsStartDate, setParamsStartDate] = useState<string | undefined>(searchParams.get('startDate') || '')
  const [paramsEndDate, setParamsEndDate] = useState<string | undefined>(searchParams.get('endDate') || '')

  function updateSearchDate(days: number) {
    setDate({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - days),
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    })
  }

  useEffect(() => {
    if (date && date.to) {
      setParamsStartDate(date?.from?.toISOString().split('T')[0])
      setParamsEndDate(date?.to?.toISOString().split('T')[0])
    }
    router.replace(`?startDate=${paramsStartDate}&endDate=${paramsEndDate}`)
  }, [date, paramsEndDate, paramsStartDate, router])

  return (
    <WidgetCard className="flex flex-col gap-4 xl:gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <p className="font-body text-sm text-zinc-900">Selecione um período</p>
        <div className="bg-zinc-900 w-0.5 h-3.5 hidden sm:block" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'max-w-[300px] justify-start text-left font-normal',
                !date && 'text-muted-foreground border-teal-800',
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd LLL, y', {
                      locale: ptBR,
                    })}{' '}
                    -{' '}
                    {format(date.to, 'dd LLL, y', {
                      locale: ptBR,
                    })}
                  </>
                ) : (
                  format(date.from, 'dd LLL, y', {
                    locale: ptBR,
                  })
                )
              ) : (
                <span>Selecione um período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-evenly gap-2 sm:gap-4 xl:gap-8 flex-wrap">
        <Button className="w-20 hover:text-teal-400 text-xs sm:text-sm" onClick={() => updateSearchDate(60)}>
          60 DIAS
        </Button>
        <Button className="w-20 hover:text-teal-400 text-xs sm:text-sm" onClick={() => updateSearchDate(30)}>
          30 DIAS
        </Button>
        <Button className="w-20 hover:text-teal-400 text-xs sm:text-sm" onClick={() => updateSearchDate(7)}>
          07 DIAS
        </Button>
        <Button className="w-20 hover:text-teal-400 text-xs sm:text-sm" onClick={() => updateSearchDate(0)}>
          HOJE
        </Button>
      </div>
    </WidgetCard>
  )
}
