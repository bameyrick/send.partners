describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=optioncomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-option').should('exist');
  });
});
