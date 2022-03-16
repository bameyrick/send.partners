describe('send.partners', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('send-partners-root').should('exist');
  });
});