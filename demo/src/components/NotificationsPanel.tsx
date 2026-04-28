import { useState, type MouseEvent } from 'react'
import {
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Notifications as NotificationsIcon } from '@mui/icons-material'

type NotificationStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

type NotificationItem = {
  id: string
  title: string
  status: NotificationStatus
  time: string
}

const statusColors: Record<NotificationStatus, string> = {
  SUCCESS: '#22C55E',
  FAILED: '#EF4444',
  PENDING: '#F59E0B',
}

const statusLabels: Record<NotificationStatus, string> = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  PENDING: 'Pending',
}

type NotificationsPanelProps = {
  notifications: NotificationItem[]
}

const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label="open notifications">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 320, p: 2, borderRadius: 3, boxShadow: theme.shadows[8] } }}
      >
        <Stack spacing={1} sx={{ mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Latest task updates — click to review.
          </Typography>
        </Stack>

        <List disablePadding>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              disablePadding
              sx={{
                mb: 1,
                borderRadius: 2,
                p: 1.5,
                backgroundColor: '#F8FAFC',
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {notification.title}
                    </Typography>
                    <Box
                      sx={{
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 1,
                        backgroundColor: `${statusColors[notification.status]}20`,
                        color: statusColors[notification.status],
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {statusLabels[notification.status]}
                    </Box>
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  )
}

export default NotificationsPanel
