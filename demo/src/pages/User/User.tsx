import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import mockUsers from '../../data/mockUsers'
import type { UserTask } from '../../types/api'
import CreateTicketDialog from '../createTicket'

const statusStyles: Record<UserTask['status'], { backgroundColor: string; color: string }> = {
  Active: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
  },
  Pending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  Suspended: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
}

const tabLabels = ['Today User List', 'User List']

const UserPage = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openCreateTicket, setOpenCreateTicket] = useState(false)
  const navigate = useNavigate()

  const users = useMemo(() => mockUsers, [])
  const todayUsers = useMemo(() => users.slice(0, 5), [users])
  const displayedUsers = tabIndex === 0 ? todayUsers : users

  const handleChangeTab = (_: React.SyntheticEvent, value: number) => {
    setTabIndex(value)
    setPage(0)
  }

  const handleOpenUser = (user: UserTask) => navigate(`/users/${user.id}`)

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - displayedUsers.length)

  return (
    <Box sx={{ minHeight: '100%', px: 3, py: 3, backgroundColor: '#F5F7FA' }}>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="user list tabs"
            sx={{
              minHeight: 44,
              '& .MuiTabs-flexContainer': {
                gap: 8,
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={label}
                label={`${label}`}
                disableRipple
                sx={{
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontSize: 15,
                  fontWeight: 600,
                  minHeight: 44,
                  px: 3,
                  py: 1.5,
                  color: tabIndex === index ? '#2563EB' : '#6B7280',
                  backgroundColor: tabIndex === index ? '#EFF6FF' : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: tabIndex === index ? '#DBEAFE' : '#F8FAFC',
                  },
                }}
              />
            ))}
          </Tabs>
          <Button
            onClick={() => setOpenCreateTicket(true)}
            variant="contained"
            sx={{
              backgroundColor: '#3B82F6',
              color: '#FFFFFF',
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
          >
            Create Ticket
          </Button>

        </Box>

        <TableContainer sx={{ borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                {['Status', 'User Name', 'Agent', 'Process', 'Source', 'Created Time', 'Action'].map(label => (
                  <TableCell
                    key={label}
                    sx={{
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      borderBottom: '1px solid #E5E7EB',
                      py: 2.25,
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => {
                  const status = statusStyles[user.status]

                  return (
                    <TableRow
                      key={user.id}
                      sx={{
                        height: 72,
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: '#F8FAFC',
                        },
                      }}
                    >
                      <TableCell sx={{ py: 2.25 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            px: 1.5,
                            py: '6px',
                            backgroundColor: status.backgroundColor,
                            color: status.color,
                            fontSize: 13,
                            fontWeight: 600,
                            minWidth: 88,
                          }}
                        >
                          {user.status}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2.25 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: '#F3F4F6',
                              color: '#111827',
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            {user.userName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{user.userName}</Typography>
                            <Typography sx={{ fontSize: 13, color: '#6B7280' }}>{user.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2.25, fontSize: 14, fontWeight: 500, color: '#111827' }}>{user.agent}</TableCell>
                      <TableCell sx={{ py: 2.25, fontSize: 14, fontWeight: 500, color: '#111827' }}>{user.process}</TableCell>
                      <TableCell sx={{ py: 2.25, fontSize: 14, fontWeight: 500, color: '#111827' }}>{user.source}</TableCell>
                      <TableCell sx={{ py: 2.25, fontSize: 14, fontWeight: 500, color: '#111827' }}>
                        {format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm')}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 2.25 }}>
                        <Button
                          onClick={() => handleOpenUser(user)}
                          variant="outlined"
                          sx={{
                            borderColor: '#D1D5DB',
                            color: '#2563EB',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '10px',
                            px: 2.5,
                            py: 1,
                            fontSize: 14,
                            fontWeight: 500,
                            textTransform: 'none',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: '#EFF6FF',
                              borderColor: '#2563EB',
                            },
                          }}
                        >
                          User Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {emptyRows > 0 && (
                <TableRow sx={{ height: emptyRows * 72 }}>
                  <TableCell colSpan={7} sx={{ borderBottom: 'none' }} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <TablePagination
            component="div"
            count={displayedUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            labelRowsPerPage="Rows"
            sx={{
              '& .MuiTablePagination-toolbar': {
                px: 0,
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: 13,
                color: '#6B7280',
              },
              '& .MuiInputBase-root': {
                fontSize: 13,
              },
            }}
          />
        </Box>
      </Paper>

      <CreateTicketDialog
        open={openCreateTicket}
        onClose={() => setOpenCreateTicket(false)}
      />
    </Box>
  )
}

export default UserPage
