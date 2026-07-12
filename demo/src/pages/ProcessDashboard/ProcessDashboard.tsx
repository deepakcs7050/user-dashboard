import React, { useCallback } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  AccountBalanceOutlined,
  AccountBalanceWalletOutlined,
  AnalyticsOutlined,
  CloudOutlined,
  FlightTakeoffOutlined,
  GroupsOutlined,
  Inventory2Outlined,
  PublicOutlined
} from '@mui/icons-material'
import ProcessCard from '../../components/ProcessCard'
import type { ProcessDefinition } from '../../types/process'
import { processes } from '../../data/mockData'

const iconMap: Record<string, React.ElementType> = {
  AccountBalanceWalletOutlined: AccountBalanceWalletOutlined,
  FlightTakeoffOutlined: FlightTakeoffOutlined,
  PublicOutlined: PublicOutlined,
  AccountBalanceOutlined: AccountBalanceOutlined,
  AnalyticsOutlined: AnalyticsOutlined,
  GroupsOutlined: GroupsOutlined,
  Inventory2Outlined: Inventory2Outlined,
  CloudOutlined: CloudOutlined
}

const ProcessDashboard = () => {
  const navigate = useNavigate()

  const handleStatusClick = useCallback((title: string, status: string) => {
    console.info(`Status clicked: ${title} • ${status}`)
  }, [])

  const handleViewDetails = useCallback(
    (title: string) => {
      console.info(`View details requested for ${title}`)
      navigate('/agents')
    },
    [navigate]
  )

  return (
    <Box sx={{ backgroundColor: '#F8FAFC', minHeight: '100vh', py: { xs: 3, md: 4 } }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#111827', mb: 1 }}>
            Process Operations Dashboard Deepak
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: 680 }}>
            Live process cards for every key enterprise workflow. Click any status row to inspect the selected process state or view full details.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {processes.map((process: ProcessDefinition) => {
            const IconComponent = iconMap[process.icon] ?? AccountBalanceWalletOutlined
            const icon = <IconComponent sx={{ fontSize: 24 }} />

            return (
              <Grid item key={process.title} xs={12} sm={6} md={3}>
                <ProcessCard
                  title={process.title}
                  icon={icon}
                  gradient={process.gradient}
                  open={process.open}
                  inProgress={process.inProgress}
                  pending={process.pending}
                  closed={process.closed}
                  completed={process.completed}
                  onStatusClick={handleStatusClick}
                  onViewDetails={handleViewDetails}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export default ProcessDashboard
