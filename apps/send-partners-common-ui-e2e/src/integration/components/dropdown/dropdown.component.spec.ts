describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dropdowncomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-dropdown').should('exist');
  });
});
