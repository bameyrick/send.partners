describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-button').should('exist');
  });
});
