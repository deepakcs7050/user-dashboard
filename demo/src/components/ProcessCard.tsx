import { Box, Card, Divider, Typography } from '@mui/material'
import type { ProcessCardProps } from '../types/process'

const statusColorMap: Record<string, string> = {
  Open: '#2563EB',
  'In Progress': '#F97316',
  Pending: '#8B5CF6',
  Closed: '#6B7280',
  Completed: '#16A34A'
}

const ProcessCard = ({
  title,
  icon,
  gradient,
  open,
  inProgress,
  pending,
  closed,
  completed,
  onStatusClick,
  onViewDetails
}: ProcessCardProps) => {
  const rows = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Pending', value: pending },
    { label: 'Closed', value: closed },
    { label: 'Completed', value: completed }
  ]

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
        transition: 'all .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Box
        sx={{
          background: gradient,
          borderRadius: '16px 16px 0 0',
          minHeight: 72,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            flexShrink: 0
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#FFFFFF',
            fontWeight: 700,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 3, display: 'grid', gap: 1 }}>
        {rows.map((row) => (
          <Box
            key={row.label}
            onClick={() => onStatusClick?.(title, row.label)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              borderRadius: 2,
              transition: 'background 200ms ease',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#F8FAFC'
              }
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
              {row.label}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: statusColorMap[row.label] || '#111827' }}
            >
              {row.value}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ mt: 1, mb: 1.5, borderColor: '#E5E7EB' }} />

        <Box
          component="button"
          type="button"
          onClick={() => onViewDetails?.(title)}
          sx={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            textAlign: 'left',
            cursor: 'pointer',
            color: '#6B7280',
            fontWeight: 700,
            fontSize: 14,
            transition: 'color 200ms ease',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          View Details →
        </Box>
      </Box>
    </Card>
  )
}

export default ProcessCard
