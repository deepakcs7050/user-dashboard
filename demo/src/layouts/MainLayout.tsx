import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material'
import MainHeader from '../components/MainHeader'
import mockTasks from '../data/mockData'

const drawerWidth = 260

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tasks', icon: <TaskIcon />, path: '/tasks' },
    { text: 'Products', icon: <ShoppingCartIcon />, path: '/products' },
  ]

  const lastFiveNotifications = mockTasks
    .slice(-5)
    .reverse()
    .map((task) => ({
      id: task.id,
      title: task.name,
      status: task.status as 'SUCCESS' | 'FAILED' | 'PENDING',
      time: new Date(task.updatedAt).toLocaleString(),
    }))

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: -0.5,
            fontSize: '1.25rem',
          }}
        >
          Finance AI Dashboard
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  position: 'relative',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563EB',
                    borderLeft: '3px solid #2563EB',
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.15)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#2563EB',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#1F2937',
                    color: '#FFFFFF',
                    '& .MuiListItemIcon-root': {
                      color: '#FFFFFF',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 48, color: isActive ? '#2563EB' : '#D1D5DB' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#2563EB' : '#D1D5DB',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <MainHeader
        title="Finance AI Dashboard"
        notificationCount={lastFiveNotifications.length}
        userName="John Doe"
        notifications={lastFiveNotifications}
      />
      <Box sx={{ display: 'flex', flex: 1, marginTop: '72px' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="navigation menu"
        >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid #E5E7EB',
              marginTop: '72px',
              height: 'calc(100vh - 72px)',
              backgroundColor: '#111827',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid #E5E7EB',
              marginTop: '72px',
              height: 'calc(100vh - 72px)',
              backgroundColor: '#111827',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#F3F4F6',
          minHeight: 'calc(100vh - 72px)',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Box>
      </Box>
    </Box>
  )
}

export default MainLayout