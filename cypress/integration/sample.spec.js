describe('Test example', () => {
  it('Shows measure icon', () => {
    cy.visit('localhost:8080/measure_both.html');
    cy.get('.leaflet-control-measure-toggle').should('have.text', 'Measure');
  });
});
