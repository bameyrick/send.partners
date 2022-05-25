describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=passwordstrengthcomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-password-strength').should('exist');
  });
});
