'use client'

import * as React from 'react'
import { Button } from './button'

/* ======================
   DataTable Wrapper
====================== */

export const DataTable = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table
        className={`w-full border-collapse table-fixed ${className}`}
      >
        {children}
      </table>
    </div>
  )
}


//    Table Sections


export const DataTableHeader = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <thead className="bg-muted/50">
    {children}
  </thead>
)

export const DataTableBody = ({
  children,
}: {
  children: React.ReactNode
}) => <tbody>{children}</tbody>

export const DataTableRow = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <tr className={`border-b last:border-0 ${className}`}>
    {children}
  </tr>
)

/* ======================
   Cells
====================== */

export const DataTableHead = ({
  children,
  className = '',
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground truncate ${className}`}
    {...props}
  >
    {children}
  </th>
)

export const DataTableCell = ({
  children,
  className = '',
  colSpan,
}: {
  children: React.ReactNode
  className?: string
  colSpan?: number
}) => (
  <td
    colSpan={colSpan}
    className={`px-4 py-3 text-sm align-middle truncate ${className}`}
  >
    {children}
  </td>
)

/* ======================
   Pagination
====================== */

export const DataTablePagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizes = [5, 10, 20, 50],
}: {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizes?: number[]
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="mt-4 w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side */}
      <p className="text-sm text-muted-foreground shrink-0">
        Showing {(page - 1) * pageSize + 1}–
        {Math.min(page * pageSize, total)} of {total}
      </p>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-md border border-input bg-background px-2 text-sm"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
