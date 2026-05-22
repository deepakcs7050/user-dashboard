import type { ReactNode } from 'react'

export interface ProcessCardProps {
  title: string
  icon: ReactNode
  gradient: string
  open: number
  inProgress: number
  pending: number
  closed: number
  completed: number
  onStatusClick?: (title: string, status: string) => void
  onViewDetails?: (title: string) => void
}

export interface ProcessDefinition {
  title: string
  icon: string
  gradient: string
  open: number
  inProgress: number
  pending: number
  closed: number
  completed: number
}
