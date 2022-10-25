describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=resetpasswordcomponent--primary'));
  it('should render the component', () => {
    cy.get('common-reset-password').should('exist');
  });
});
