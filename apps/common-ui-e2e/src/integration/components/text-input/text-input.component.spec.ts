describe('common-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textinputcomponent--primary'));
  it('should render the component', () => {
    cy.get('app-text-input').should('exist');
  });
});
