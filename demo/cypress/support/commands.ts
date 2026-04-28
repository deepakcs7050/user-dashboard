Cypress.Commands.add('login', ({ email, password }: { email: string; password: string }) => {
  cy.intercept('POST', '/api/login', {
    statusCode: 200,
    body: { token: 'fake-jwt-token' },
  }).as('loginRequest')

  cy.visit('/login')
  cy.get('[name="email"]').type(email)
  cy.get('[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.wait('@loginRequest')
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(credentials: { email: string; password: string }): Chainable<void>
    }
  }
}
