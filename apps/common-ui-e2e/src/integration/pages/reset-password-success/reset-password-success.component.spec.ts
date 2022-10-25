describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=resetpasswordsuccesscomponent--primary'));
  it('should render the component', () => {
    cy.get('common-reset-password-success').should('exist');
  });
});
