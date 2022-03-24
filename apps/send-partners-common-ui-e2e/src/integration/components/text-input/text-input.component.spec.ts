describe('send-partners-common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textinputcomponent--primary'));
  it('should render the component', () => {
    cy.get('send.partners-text-input').should('exist');
  });
});
