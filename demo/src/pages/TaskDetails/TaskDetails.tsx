import { useParams } from 'react-router-dom'
import { Container, Typography, Box, Paper, Stack, Divider, Button, Grid } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { StatusChip } from '../../components'
import mockTasks from '../../data/mockData'

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const task = mockTasks.find((t) => t.id === id)

  if (!task) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/tasks')}
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to Tasks
          </Button>
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: 1, borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Task Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The requested task could not be found.
            </Typography>
          </Paper>
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/tasks')}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Tasks
        </Button>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Task Details
        </Typography>

        <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Task Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Task ID
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'mono', backgroundColor: 'grey.50', px: 2, py: 1, borderRadius: 1 }}>
                  {task.id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Status
                </Typography>
                <StatusChip status={task.status} size="medium" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Created By
                </Typography>
                <Typography variant="body1">{task.createdBy}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Updated By
                </Typography>
                <Typography variant="body1">{task.updatedBy}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Created At
                </Typography>
                <Typography variant="body1">{new Date(task.createdAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Updated At
                </Typography>
                <Typography variant="body1">{new Date(task.updatedAt).toLocaleString()}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Task Name
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {task.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {task.description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Stack>
    </Container>
  )
}

export default TaskDetails