describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=formcomponent--primary&args=formGroup;'));
  it('should render the component', () => {
    cy.get('form').should('exist');
  });
});
