describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=emailverificationcomponent--primary'));
  it('should render the component', () => {
    cy.get('common-email-verification').should('exist');
  });
});
