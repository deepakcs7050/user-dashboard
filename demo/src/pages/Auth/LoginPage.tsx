import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  Stack,
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import type { LoginRequest } from '../../types/api'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formState, setFormState] = useState<LoginRequest>({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard'

  const validate = () => {
    if (!formState.email.trim() || !formState.password.trim()) {
      setError('Email and password are required.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      setError('Enter a valid email address.')
      return false
    }
    return true
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!validate()) {
      return
    }

    try {
      setLoading(true)
      await login(formState)
      navigate(from, { replace: true })
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', py: 8 }}>
      <Paper sx={{ width: '100%', p: 4, boxShadow: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign in
            </Typography>
            <Typography color="text.secondary">
              Use your email and password to access the task dashboard.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={event => setFormState(prev => ({ ...prev, email: event.target.value }))}
                autoComplete="email"
                fullWidth
                required
              />

              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={event => setFormState(prev => ({ ...prev, password: event.target.value }))}
                autoComplete="current-password"
                fullWidth
                required
              />

              <Button type="submit" variant="contained" size="large" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}

export default LoginPage
