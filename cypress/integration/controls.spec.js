describe('UI controls behavior', () => {
  it('Shows measure icon if UI was enabled', () => {
    cy.visit('localhost:8080/measure_both.html');
    cy.get('.leaflet-control-measure-toggle').should('have.text', 'Measure');
  });

  it('Hide measure icon if UI was disabled', () => {
    cy.visit('localhost:8080/without_ui.html');
    cy.get('.leaflet-control-measure-toggle').should('not.exist');
  });
});
