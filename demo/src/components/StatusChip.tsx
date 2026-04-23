import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'

export type TaskStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

const statusMap: Record<TaskStatus, { label: string; color: ChipProps['color'] }> = {
  SUCCESS: { label: 'Success', color: 'success' },
  FAILED: { label: 'Failed', color: 'error' },
  PENDING: { label: 'Pending', color: 'warning' },
}

type StatusChipProps = {
  status: TaskStatus
  size?: 'small' | 'medium'
  variant?: 'filled' | 'outlined'
  onClick?: () => void
}

const StatusChip = ({ status, size = 'small', variant = 'filled', onClick }: StatusChipProps) => {
  const validStatus: TaskStatus = (status && ['SUCCESS', 'FAILED', 'PENDING'].includes(status)) ? status : 'PENDING'
  const config = statusMap[validStatus]

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant={variant}
      sx={{
        fontWeight: 600,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        px: 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={onClick}
    />
  )
}

export default StatusChip
