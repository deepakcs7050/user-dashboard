import { useState, type MouseEvent } from 'react'
import { Box, Avatar, IconButton, Typography, Badge, Popover, List, ListItem, ListItemText, Stack } from '@mui/material'
import { Notifications as NotificationsIcon, AccountCircle as AccountIcon } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'

type NotificationStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

type NotificationItem = {
  id: string
  title: string
  status: NotificationStatus
  time: string
}

interface MainHeaderProps {
  title?: string
  notificationCount?: number
  userName?: string
  notifications?: NotificationItem[]
}

const statusColors: Record<NotificationStatus, string> = {
  SUCCESS: '#22C55E',
  FAILED: '#EF4444',
  PENDING: '#F59E0B',
}

const headerStyles: Record<string, SxProps<Theme>> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1200,
    backgroundColor: '#FFFFFF',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    borderBottom: '1px solid #E5E7EB',
    height: '72px',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#2563EB',
    letterSpacing: -0.5,
  },
  title: {
    color: '#111827',
    fontWeight: 600,
    fontSize: '18px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    color: '#111827',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 500,
    display: { xs: 'none', sm: 'block' },
    color: '#111827',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    border: '2px solid rgba(37, 99, 235, 0.2)',
    color: '#2563EB',
  },
  notificationIcon: {
    color: '#6B7280',
    '&:hover': {
      backgroundColor: 'rgba(37, 99, 235, 0.04)',
      color: '#2563EB',
    },
  },
}

const MainHeader = ({
  title = 'Finance AI Dashboard',
  notificationCount = 0,
  userName = 'John Doe',
  notifications = [],
}: MainHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleNotificationOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={headerStyles.header}>
      {/* Left Section - Logo & Title */}
      <Box sx={headerStyles.leftSection}>
        <Box sx={headerStyles.logo}>📊</Box>
        <Typography sx={headerStyles.title}>{title}</Typography>
      </Box>

      {/* Right Section - Notifications & User */}
      <Box sx={headerStyles.rightSection}>
        {/* Notification Bell */}
        <IconButton sx={headerStyles.notificationIcon} size="small" onClick={handleNotificationOpen}>
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        {/* Notifications Popover */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              width: 320,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              marginTop: '8px',
            },
          }}
        >
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Latest task updates — click to review.
            </Typography>
          </Stack>

          <List disablePadding>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  disablePadding
                  sx={{
                    mb: 1,
                    borderRadius: 1.5,
                    p: 1.5,
                    backgroundColor: '#F8FAFC',
                    borderLeft: `3px solid ${statusColors[notification.status]}`,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {notification.title}
                        </Typography>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.3,
                            borderRadius: 1,
                            backgroundColor: statusColors[notification.status],
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}
                        >
                          {notification.status}
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No notifications yet
              </Typography>
            )}
          </List>
        </Popover>

        {/* User Info */}
        <Box sx={headerStyles.userInfo}>
          <Typography sx={headerStyles.userName}>{userName}</Typography>
          <Avatar sx={headerStyles.avatar}>
            <AccountIcon />
          </Avatar>
        </Box>
      </Box>
    </Box>
  )
}

export default MainHeader
