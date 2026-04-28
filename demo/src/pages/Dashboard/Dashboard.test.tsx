import { screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '../../test-utils/server'
import { render } from '../../test-utils/test-utils'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('renders loading state while fetching', async () => {
    render(<Dashboard />)

    expect(screen.getByLabelText(/loading dashboard data/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByLabelText(/loading dashboard data/i)).not.toBeInTheDocument())
  })

  it('renders summary data when the API returns successfully', async () => {
    render(<Dashboard />)

    expect(await screen.findByText(/total tasks/i)).toBeInTheDocument()
    expect(screen.getByText('63')).toBeInTheDocument()
    expect(screen.getByText(/completed/i)).toBeInTheDocument()
    expect(screen.getByText(/failed/i)).toBeInTheDocument()
    expect(screen.getByText(/pending/i)).toBeInTheDocument()
  })

  it('shows an error alert when the dashboard request fails', async () => {
    server.use(
      rest.get('http://localhost:5173/api/dashboard', (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server unavailable' }))
      }),
    )

    render(<Dashboard />)

    expect(await screen.findByRole('alert')).toHaveTextContent(/server unavailable/i)
  })
})
