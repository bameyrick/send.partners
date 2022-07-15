describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordstrengthcomponent--primary'));
  it('should render the component', () => {
    cy.get('app-password-strength').should('exist');
  });
});
