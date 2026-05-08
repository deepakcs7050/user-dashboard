import { Box, Button, Typography } from '@mui/material'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1.5,
      py: { xs: 6, md: 7 },
      px: 3,
      textAlign: 'center',
      width: '100%',
      backgroundColor: 'background.paper',
      borderRadius: 3,
      boxShadow: 1,
    }}
  >
    <Typography variant="h6" fontWeight={700}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" maxWidth={520}>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button variant="contained" color="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
)

export default EmptyState
