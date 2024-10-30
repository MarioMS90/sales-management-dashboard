describe('Sign In', () => {
  it('should log in a user successfully', () => {
    const user = {
      email: 'user@gmail.com',
      password: '123456',
    };

    cy.visit('/sign-in');

    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    // Verifica que se redirige al dashboard o página protegida
    cy.url().should('include', '/dashboard');
  });
});

describe('Sign Up Form', () => {
  it('should sign up a user successfully', () => {
    cy.visit('/sign-up');

    cy.get('button').contains('Generate random user').click();

    cy.get('input[name="name"]')
      .invoke('val')
      .should('not.be.empty')
      .then(name => {
        cy.get('input[name="email"]').should('have.value', `${name}@gmail.com`);
      });
    cy.get('input[name="password"]').invoke('val').should('not.be.empty');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });
});
