describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=languagescomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-languages').should('exist');
  });
});
