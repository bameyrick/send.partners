describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-login').should('exist');
  });
});
