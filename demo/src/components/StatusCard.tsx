import type { ReactNode } from 'react'
import { Box, Card, CardActionArea, CardContent, Stack, Typography, useTheme } from '@mui/material'

type StatusCardProps = {
  title: string
  count: number | string
  color?: string
  icon: ReactNode
  onClick?: () => void
}

const StatusCard = ({ title, count, color, icon, onClick }: StatusCardProps) => {
  const theme = useTheme()
  const borderColor = color ?? theme.palette.primary.main

  // Define background colors for icons based on status
  const getIconBackground = (color: string) => {
    switch (color) {
      case '#16A34A': return '#DCFCE7' // light green for success
      case '#DC2626': return '#FEE2E2' // light red for failed
      case '#F59E0B': return '#FEF3C7' // light yellow for pending
      default: return `${color}15`
    }
  }

  const content = (
    <CardContent sx={{ px: 4, py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
        <Box>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              letterSpacing: 1.2,
              fontWeight: 600,
              fontSize: '0.75rem',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            {count}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 72,
            height: 72,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            backgroundColor: getIconBackground(borderColor),
            color: borderColor,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: `${borderColor}20`,
            },
          }}
        >
          {icon}
        </Box>
      </Stack>
    </CardContent>
  )

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease-in-out',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: '#FFFFFF',
        '&:hover': {
          transform: onClick ? 'translateY(-4px)' : 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {onClick ? <CardActionArea onClick={onClick}>{content}</CardActionArea> : content}
    </Card>
  )
}

export default StatusCard
