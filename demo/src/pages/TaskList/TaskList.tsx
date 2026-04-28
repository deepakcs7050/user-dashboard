import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { DataTable, StatusChip } from '../../components'
import SearchBar from '../../components/SearchBar'
import mockTasks from '../../data/mockData'
import type { Task } from '../../types/task'
import type { DataTableColumn } from '../../components/DataTable'

const TaskList = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')

  const statusFilter = searchParams.get('status') || ''

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.id.toLowerCase().includes(searchValue.toLowerCase())

      const matchesStatus = !statusFilter || task.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchValue, statusFilter])

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value
    if (value) {
      setSearchParams({ status: value })
    } else {
      setSearchParams({})
    }
  }

  const handleViewDetails = (task: Task) => {
    navigate(`/tasks/${task.id}`)
  }

  const columns: DataTableColumn<Task>[] = [
    {
      id: 'id',
      label: 'Task ID',
      minWidth: 120,
      sortable: true,
    },
    {
      id: 'name',
      label: 'Task Name',
      minWidth: 200,
      sortable: true,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      sortable: true,
      renderCell: (task) => <StatusChip status={task.status} />,
    },
    {
      id: 'createdAt',
      label: 'Created Date',
      minWidth: 180,
      sortable: true,
      valueKey: (task) => new Date(task.createdAt),
      renderCell: (task) => new Date(task.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 140,
      renderCell: (task) => (
        <Button
          size="small"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation()
            handleViewDetails(task)
          }}
          sx={{
            minWidth: 100,
            fontWeight: 600,
          }}
        >
          View Details
        </Button>
      ),
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Task List
          </Typography>

          <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <SearchBar
                value={searchValue}
                onSearch={setSearchValue}
                placeholder="Search by task name or ID..."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                size="small"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                displayEmpty
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                  },
                }}
              >
                <MenuItem value="">
                  <em>All Statuses</em>
                </MenuItem>
                <MenuItem value="SUCCESS">Success</MenuItem>
                <MenuItem value="FAILED">Failed</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <DataTable<Task>
            rows={filteredTasks}
            columns={columns}
            defaultRowsPerPage={10}
            rowsPerPageOptions={[5, 10, 25]}
            noDataMessage="No tasks found matching your criteria"
          />
        </Box>
      </Stack>
    </Container>
  )
}

export default TaskList