describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=requestpasswordresetsuccesscomponent--primary'));
  it('should render the component', () => {
    cy.get('common-request-password-reset-success').should('exist');
  });
});
