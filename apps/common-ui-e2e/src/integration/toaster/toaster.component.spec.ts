describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=toastercomponent--primary'));
  it('should render the component', () => {
    cy.get('common-toaster').should('exist');
  });
});
