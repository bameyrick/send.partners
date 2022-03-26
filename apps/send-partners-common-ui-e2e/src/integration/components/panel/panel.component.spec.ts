describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=panelcomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-panel').should('exist');
  });
});
