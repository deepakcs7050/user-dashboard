import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../test-utils/server'
import { render } from '../../test-utils/test-utils'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the login form', () => {
    render(<LoginPage />)

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  it('shows validation errors when fields are empty', async () => {
    render(<LoginPage />)

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/email and password are required/i)).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginPage />)

    await userEvent.type(screen.getByLabelText(/email/i), 'bad-email')
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('logs in successfully and saves the user', async () => {
    render(<LoginPage />)

    await userEvent.type(screen.getByLabelText(/email/i), 'test.user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(localStorage.getItem('demo-auth-user')).toContain('test.user@example.com')
    })
  })

  it('shows an error message for invalid credentials', async () => {
    server.use(
      rest.post('http://localhost:5173/api/login', (_, res, ctx) => {
        return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }))
      }),
    )

    render(<LoginPage />)

    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong-password')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/invalid credentials/i)
  })
})
