import { useCallback } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import type { Agent } from '../../components/AgentCard/AgentCard.types'
import AgentCard from '../../components/AgentCard/AgentCard'

const agents: Agent[] = [
  {
    id: '1',
    firstName: 'Deepak',
    lastName: 'Kumar',
    isActive: true,
    stats: {
      open: 5,
      pending: 5,
      completed: 30,
      closed: 12,
      inProgress: 56
    },
    headerGradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
  },
  {
    id: '2',
    firstName: 'Rahul',
    lastName: 'Sharma',
    isActive: false,
    stats: {
      open: 3,
      pending: 2,
      completed: 20,
      closed: 5,
      inProgress: 5
    },
    headerGradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)'
  },
  {
    id: '3',
    firstName: 'Priya',
    lastName: 'Patel',
    isActive: true,
    stats: {
      open: 8,
      pending: 4,
      completed: 45,
      closed: 20,
      inProgress: 32
    },
    headerGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
  },
  {
    id: '4',
    firstName: 'Amit',
    lastName: 'Singh',
    isActive: true,
    stats: {
      open: 6,
      pending: 3,
      completed: 38,
      closed: 15,
      inProgress: 28
    },
    headerGradient: 'linear-gradient(135deg, #D946EF 0%, #C026D3 100%)'
  }
]

const AgentList = () => {
  const handleViewDetails = useCallback((agent: Agent) => {
    console.info(`Agent detail requested for ${agent.firstName} ${agent.lastName}`)
  }, [])

  return (
    <Box sx={{ backgroundColor: '#F8FAFC', minHeight: '100vh', py: { xs: 3, md: 4 } }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#111827', mb: 1 }}>
            Support Agent Directory
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: 680 }}>
            Browse the active support agents and see their workload snapshots.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {agents.map((agent) => (
            <Grid item xs={12} sm={6} md={3} key={agent.id}>
              <AgentCard agent={agent} onViewDetails={handleViewDetails} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default AgentList
