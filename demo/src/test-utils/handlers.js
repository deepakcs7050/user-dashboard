const { rest } = require('msw')

const handlers = [
  rest.post('http://localhost:5173/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json()

    if (email === 'test.user@example.com' && password === 'Password123') {
      return res(ctx.status(200), ctx.json({ token: 'fake-jwt-token' }))
    }

    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }))
  }),

  rest.get('http://localhost:5173/api/dashboard', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        welcome: 'Hello from your dashboard',
        tasks: { success: 42, failed: 8, pending: 13, total: 63 },
      }),
    )
  }),
]

module.exports = { handlers }
