describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=optioncomponent--primary'));
  it('should render the component', () => {
    cy.get('app-option').should('exist');
  });
});
