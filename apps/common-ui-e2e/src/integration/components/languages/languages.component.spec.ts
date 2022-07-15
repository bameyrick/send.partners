describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=languagescomponent--primary'));
  it('should render the component', () => {
    cy.get('app-languages').should('exist');
  });
});
