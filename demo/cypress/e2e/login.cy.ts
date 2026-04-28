describe('Login page', () => {
  it('renders the login form', () => {
    cy.visit('/login')

    cy.get('h1').should('contain.text', 'Sign in')
    cy.get('[name="email"]').should('exist')
    cy.get('[name="password"]').should('exist')
  })

  it('shows validation errors when input is invalid', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').click()
    cy.contains(/email and password are required/i).should('be.visible')
  })

  it('navigates to dashboard on successful login', () => {
    cy.login({ email: 'test.user@example.com', password: 'Password123' })
    cy.url().should('include', '/dashboard')
  })
})
