describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--primary&args=type:button;disabled;loading;iconOnly;'));
  it('should render the component', () => {
    cy.get('button').should('exist');
  });
});
