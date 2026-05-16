import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { CheckCircle, Error, Pending, Task, TrendingUp } from '@mui/icons-material'
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
  { label: 'Total', key: 'total', color: '#6B7280' },
  { label: 'Success Rate', key: 'successRate', color: '#0EA5E9' },
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
    return data?.tasks || { total: 0, success: 0, failed: 0, pending: 0 ,successRate: '0%' }
  }, [data])

  const successRate = useMemo(() => {
    return stats.total ? Math.round((stats.success / stats.total) * 100) : 0
  }, [stats])

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
    <Box sx={{ p: 3, backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
        <Stack spacing={4}>
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
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    md: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(5, minmax(0, 1fr))',
                  },
                }}
              >
                <StatusCard
                  title="Total Tasks"
                  count={stats.total}
                  color="#6B7280"
                  icon={<Task sx={{ fontSize: 32 }} />}
                  onClick={() => navigate('/tasks')}
                />
                <StatusCard
                  title="Completed"
                  count={stats.success}
                  color="#22C55E"
                  icon={<CheckCircle sx={{ fontSize: 32 }} />}
                  onClick={() => navigate('/tasks?status=success')}
                />
                <StatusCard
                  title="Failed"
                  count={stats.failed}
                  color="#EF4444"
                  icon={<Error sx={{ fontSize: 32 }} />}
                  onClick={() => navigate('/tasks?status=failed')}
                />
                <StatusCard
                  title="Pending"
                  count={stats.pending}
                  color="#F59E0B"
                  icon={<Pending sx={{ fontSize: 32 }} />}
                  onClick={() => navigate('/tasks?status=pending')}
                />
                <StatusCard
                  title="Success Rate"
                  count={`${successRate}%`}
                  color="#0EA5E9"
                  icon={<TrendingUp sx={{ fontSize: 32 }} />}
                  onClick={() => navigate('/tasks?status=success')}
                />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <Box sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    p: 4,
                    minHeight: 360,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                    }
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#111827' }}>
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid #E5E7EB' }}>
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
                  <Box sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    p: 4,
                    minHeight: 360,
                    position: 'relative',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                    }
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#111827' }}>
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
                          <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827' }}>
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
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>
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
      </Box>
    </Box>
  )
}

export default Dashboard
