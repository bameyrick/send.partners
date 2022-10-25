describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=toastcomponent--primary&args=toast;'));
  it('should render the component', () => {
    cy.get('common-toast').should('exist');
  });
});
