describe('Create Account Functionality', () => {
    it('allows a user to create an account', () => {
      cy.visit('/create-account');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('form').submit();
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, testuser').should('be.visible');
    });
  });
  