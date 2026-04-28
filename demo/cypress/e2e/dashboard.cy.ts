describe('Dashboard flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/dashboard', {
      statusCode: 200,
      body: {
        welcome: 'Hello from Cypress',
        tasks: { total: 63, success: 42, failed: 8, pending: 13 },
      },
    }).as('dashboardRequest')

    cy.visit('/login')
    cy.window().then(win => {
      win.localStorage.setItem('demo-auth-user', JSON.stringify({ email: 'test.user@example.com', token: 'fake-jwt-token' }))
    })
    cy.visit('/dashboard')
    cy.wait('@dashboardRequest')
  })

  it('renders dashboard metrics', () => {
    cy.contains('Dashboard').should('be.visible')
    cy.contains('63').should('be.visible')
    cy.contains('Completed').should('be.visible')
    cy.contains('Failed').should('be.visible')
    cy.contains('Pending').should('be.visible')
  })
})
