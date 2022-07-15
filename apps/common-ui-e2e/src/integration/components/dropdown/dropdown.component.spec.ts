describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dropdowncomponent--primary'));
  it('should render the component', () => {
    cy.get('app-dropdown').should('exist');
  });
});
