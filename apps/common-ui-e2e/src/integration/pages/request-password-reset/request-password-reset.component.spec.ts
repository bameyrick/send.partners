describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=requestpasswordresetcomponent--primary'));
  it('should render the component', () => {
    cy.get('common-request-password-reset').should('exist');
  });
});
