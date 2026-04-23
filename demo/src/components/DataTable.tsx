import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import type { TableCellProps } from '@mui/material'

export type Order = 'asc' | 'desc'

export interface DataTableColumn<T> {
  id: string
  label: string
  align?: TableCellProps['align']
  minWidth?: number
  sortable?: boolean
  valueKey?: keyof T | ((row: T) => string | number | boolean | Date | null | undefined)
  renderCell?: (row: T) => ReactNode
}

export interface DataTableProps<T> {
  rows: T[]
  columns: DataTableColumn<T>[]
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
  initialOrderBy?: string
  initialOrder?: Order
  onRowClick?: (row: T) => void
  noDataMessage?: string
}

function getCellValue<T>(row: T, column: DataTableColumn<T>) {
  if (typeof column.valueKey === 'function') {
    return column.valueKey(row)
  }

  if (column.valueKey) {
    return row[column.valueKey]
  }

  return (row as Record<string, unknown>)[column.id]
}

function safeString(value: unknown) {
  if (value === null || value === undefined) {
    return ''
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return String(value)
}

function descendingComparator<T>(a: T, b: T, orderBy: string, columns: DataTableColumn<T>[]) {
  const column = columns.find((item) => item.id === orderBy)
  if (!column) {
    return 0
  }

  const aValue = getCellValue(a, column)
  const bValue = getCellValue(b, column)

  if (aValue === bValue) {
    return 0
  }

  if (aValue === null || aValue === undefined) {
    return 1
  }

  if (bValue === null || bValue === undefined) {
    return -1
  }

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return bValue - aValue
  }

  const aString = safeString(aValue).toLowerCase()
  const bString = safeString(bValue).toLowerCase()

  return bString < aString ? -1 : bString > aString ? 1 : 0
}

function getComparator<T>(order: Order, orderBy: string, columns: DataTableColumn<T>[]) {
  return order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy, columns)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy, columns)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilized = array.map((el, index) => [el, index] as [T, number])
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0])
    return order !== 0 ? order : a[1] - b[1]
  })
  return stabilized.map((el) => el[0])
}

function getInitialOrderBy<T>(columns: DataTableColumn<T>[], initialOrderBy?: string) {
  if (initialOrderBy && columns.some((column) => column.id === initialOrderBy)) {
    return initialOrderBy
  }

  const sortableColumn = columns.find((column) => column.sortable)
  return sortableColumn?.id ?? columns[0]?.id ?? ''
}

export default function DataTable<T>({
  rows,
  columns,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  initialOrder = 'asc',
  initialOrderBy,
  onRowClick,
  noDataMessage = 'No data available',
}: DataTableProps<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const [order, setOrder] = useState<Order>(initialOrder)
  const [orderBy, setOrderBy] = useState(getInitialOrderBy(columns, initialOrderBy))

  const sortedRows = useMemo(() => {
    if (!orderBy) {
      return rows
    }

    return stableSort(rows, getComparator(order, orderBy, columns))
  }, [order, orderBy, rows, columns])

  const visibleRows = useMemo(
    () => sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, sortedRows],
  )

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper elevation={1} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, rowIndex) => (
                <TableRow
                  hover={Boolean(onRowClick)}
                  key={rowIndex}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => {
                    const cellValue = getCellValue(row, column)
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.renderCell ? column.renderCell(row) : safeString(cellValue)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ py: 8 }}>
                  <Box textAlign="center">
                    <Typography color="text.secondary">{noDataMessage}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
