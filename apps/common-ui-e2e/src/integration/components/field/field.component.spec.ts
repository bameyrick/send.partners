describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fieldcomponent--primary&args=parent;'));
  it('should render the component', () => {
    cy.get('common-field').should('exist');
  });
});
