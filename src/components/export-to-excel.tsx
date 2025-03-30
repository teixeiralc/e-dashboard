'use client'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Button } from './ui/button'
import { FileUp } from 'lucide-react'

interface IExportToExcelProps<T> {
  data: T[]
  fileName?: string
}

export function ExportToExcel<T>({ data, fileName = 'export' }: IExportToExcelProps<T>) {
  function handleExport() {
    if (data.length === 0) {
      alert('Nenhum dado disponível para exportação.')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

    saveAs(blob, `${fileName}.xlsx`)
  }
  return (
    <Button onClick={handleExport} className="hover:text-teal-400">
      <FileUp className="h-4 w-4" />
    </Button>
  )
}
