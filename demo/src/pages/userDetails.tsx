import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import mockUsers from '../data/mockUsers'
import type { UserTask } from '../types/api'

const statusStyles: Record<UserTask['status'], { backgroundColor: string; color: string }> = {
  Active: { backgroundColor: '#DCFCE7', color: '#166534' },
  Pending: { backgroundColor: '#FEF3C7', color: '#92400E' },
  Suspended: { backgroundColor: '#FEE2E2', color: '#991B1B' },
}

const UserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const user = useMemo(() => mockUsers.find(item => item.id === id), [id])

  if (!user) {
    return (
      <Box sx={{ minHeight: '100%', px: 3, py: 3, backgroundColor: '#F5F7FA' }}>
        <Paper sx={{ p: 4, borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#111827', mb: 1 }}>User not found</Typography>
          <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 3 }}>The selected user does not exist or has been removed.</Typography>
          <Button onClick={() => navigate('/users')} variant="contained" sx={{ mt: 1 }}>Back to users</Button>
        </Paper>
      </Box>
    )
  }

  const status = statusStyles[user.status] || { backgroundColor: '#E2E8F0', color: '#334155' }

  return (
    <Box sx={{ minHeight: '100%', px: 3, py: 3, backgroundColor: '#F5F7FA' }}>
      <Paper sx={{ p: 3, borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, alignItems: 'center', mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>{user.userName}</Typography>
              <Chip label={user.status} sx={{ borderRadius: '999px', backgroundColor: status.backgroundColor, color: status.color, fontWeight: 600, height: 32 }} />
            </Box>
            <Typography sx={{ fontSize: 14, color: '#6B7280', mt: 1 }}>{user.email}</Typography>
          </Box>
          <Button
            onClick={() => navigate('/users')}
            variant="outlined"
            sx={{ borderRadius: '10px', px: 3, py: 1.25, fontSize: 14, fontWeight: 600, borderColor: '#D1D5DB', color: '#374151', '&:hover': { borderColor: '#9CA3AF', backgroundColor: '#F8FAFC' } }}
          >
            Back to users
          </Button>
        </Box>

        <Paper sx={{ mb: 3, borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <Box sx={{ px: 3, py: 3, borderBottom: '1px solid #E5E7EB', backgroundColor: '#F8FAFB' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Task Details</Typography>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                  {['Agent Name', 'Process', 'Source (Email)', 'Task Name', 'Sender', 'Created Time', 'Assignee'].map(label => (
                    <TableCell key={label} sx={{ color: '#334155', fontWeight: 700, fontSize: 13, borderBottom: '1px solid #E5E7EB', py: 2 }}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: '#FFFFFF' }}>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.agent || 'N/A'}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.process}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.source}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.userName}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.email}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell sx={{ py: 2, fontSize: 14, color: '#111827' }}>{user.agent || 'Unassigned'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>Task Tracker</Typography>
            </Box>
            <Typography sx={{ fontSize: 14, color: '#6B7280' }}>No execution logs found for this ticket.</Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#F0F9FF' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#111827', mb: 1 }}>AI Summary</Typography>
            <Typography sx={{ fontSize: 14, color: '#334155', lineHeight: 1.75 }}>
              No conversational data, approvals, or payment information were found in the provided email content.
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#111827', mb: 2 }}>Comments</Typography>
            <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 2 }}>No comments yet</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write a comment..."
                sx={{
                  flex: 1,
                  minWidth: 0,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    minHeight: 56,
                    backgroundColor: '#F8FAFC',
                    borderColor: '#D1D5DB',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D1D5DB',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: 14,
                    padding: '14px 16px',
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => setComment('')}
                sx={{
                  height: 44,
                  whiteSpace: 'nowrap',
                  borderRadius: 11,
                  px: 3,
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: '#2563EB',
                  '&:hover': {
                    backgroundColor: '#1D4ED8',
                  },
                }}
              >
                Post
              </Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Box>
  )
}

export default UserDetails
