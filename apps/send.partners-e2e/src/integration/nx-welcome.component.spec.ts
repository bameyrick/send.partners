describe('send.partners', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('send-partners-nx-welcome').should('exist');
  });
});