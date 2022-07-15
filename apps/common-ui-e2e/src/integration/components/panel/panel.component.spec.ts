describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=panelcomponent--primary'));
  it('should render the component', () => {
    cy.get('app-panel').should('exist');
  });
});
