describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=fieldcomponent--primary&args=parent;'));
  it('should render the component', () => {
    cy.get('send-partners-common-field').should('exist');
  });
});
