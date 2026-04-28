import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { CheckCircle, Error, Pending, Task } from '@mui/icons-material'
import { StatusCard } from '../../components'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { fetchDashboardSummary } from '../../services/dashboard'
import type { DashboardSummary } from '../../types/api'

const statusItems = [
  { label: 'Success', key: 'success', color: '#22C55E' },
  { label: 'Failed', key: 'failed', color: '#EF4444' },
  { label: 'Pending', key: 'pending', color: '#F59E0B' },
] as const

const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetchDashboardSummary()
        setData(response)
      } catch (err) {
        setError((err as Error).message || 'Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  const stats = useMemo(() => {
    return data?.tasks || { total: 0, success: 0, failed: 0, pending: 0 }
  }, [data])

  const chartData = useMemo(() => {
    return statusItems.map(item => {
      const value = stats[item.key]
      return {
        ...item,
        value,
        percentage: stats.total ? Math.round((value / stats.total) * 100) : 0,
      }
    })
  }, [stats])

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
            Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {data?.welcome ?? 'Welcome to your task management dashboard'}
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 300 }}>
            <CircularProgress aria-label="Loading dashboard data" />
          </Box>
        ) : error ? (
          <Alert severity="error" role="alert">
            {error}
          </Alert>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Total Tasks"
                  count={stats.total}
                  color="#64748B"
                  icon={<Task sx={{ fontSize: 36 }} />}
                  onClick={() => navigate('/tasks')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Completed"
                  count={stats.success}
                  color="#22C55E"
                  icon={<CheckCircle sx={{ fontSize: 36 }} />}
                  onClick={() => navigate('/tasks?status=success')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Failed"
                  count={stats.failed}
                  color="#EF4444"
                  icon={<Error sx={{ fontSize: 36 }} />}
                  onClick={() => navigate('/tasks?status=failed')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatusCard
                  title="Pending"
                  count={stats.pending}
                  color="#F59E0B"
                  icon={<Pending sx={{ fontSize: 36 }} />}
                  onClick={() => navigate('/tasks?status=pending')}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 3, p: 4, minHeight: 360, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Task Distribution
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Overview of task statuses and completion trends.
                  </Typography>

                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                    {chartData.map(item => (
                      <Box key={item.label} sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: item.color }}>
                          {item.percentage}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: 3, p: 4, minHeight: 360, position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Status Breakdown
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Percentage distribution of all task statuses.
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', width: 200, height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value">
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E7EB',
                              borderRadius: 8,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                          />
                          <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                      <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                          {stats.total}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Tasks
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Stack spacing={1}>
                    {chartData.map(item => (
                      <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {item.percentage}%
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Dashboard
