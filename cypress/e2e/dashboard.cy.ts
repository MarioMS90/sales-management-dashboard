describe('Dashboard', () => {
  beforeEach(() => {
    cy.setCookie('authjs.csrf-token', Cypress.env('AUTHJS_CSRF_TOKEN'));
    cy.setCookie('authjs.session-token', Cypress.env('AUTHJS_SESSION_TOKEN'));
    cy.visit('/dashboard');
  });

  it('should display dashboard sections and navigate links', () => {
    cy.contains('h1', 'Dashboard').should('be.visible');

    cy.get('nav').within(() => {
      cy.contains('Home').should('have.attr', 'href', '/dashboard');
      cy.contains('Invoices').should('have.attr', 'href', '/dashboard/invoices');
      cy.contains('Sellers').should('have.attr', 'href', '/dashboard/sellers');
    });

    cy.contains('Invoices').click();
    cy.url().should('include', '/dashboard/invoices');

    cy.visit('/dashboard');

    cy.contains('Sellers').click();
    cy.url().should('include', '/dashboard/sellers');
  });

  it('should display cards with sales data', () => {
    cy.contains('Total Sales').should('be.visible');
    cy.contains('Total Sales - Last Year').should('be.visible');
    cy.contains('Total Sales - Last Month').should('be.visible');
    cy.contains('Top Salesperson').should('be.visible');
  });

  it('should show sales overview chart', () => {
    cy.get('.recharts-bar').should('exist');
  });

  it('should display top sellers', () => {
    cy.get('.card').each(card => {
      cy.wrap(card).find('h3').should('be.visible');

      cy.wrap(card).find('.card-content').should('be.visible');
    });
  });

  it('should allow the user to log out', () => {
    cy.on('uncaught:exception', err => {
      if (err.message.includes('NEXT_REDIRECT')) {
        return false;
      }

      return true;
    });

    cy.get('button[aria-label="Sign Out"]').click();

    cy.url().should('include', '/sign-in');
  });

  it('should display invoices table when navigate to invoices section', () => {
    cy.contains('Invoices').click();

    cy.get('.invoices-table').should('be.visible');
  });

  it('should display sellers table when navigate to sellers section', () => {
    cy.contains('Sellers').click();

    cy.get('.sellers-table').should('be.visible');
  });
});
