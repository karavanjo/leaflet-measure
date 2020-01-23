describe('UI controls behavior', () => {
  it('Shows measure icon if UI was enabled (by default)', () => {
    cy.visit('localhost:8080/measure.html');
    cy.get('.leaflet-control-measure-toggle').should('have.text', 'Measure');
  });

  it('Hide measure icon if UI was disabled', () => {
    cy.visit('localhost:8080/measure.html?options={"ui":{"control":false}}');
    cy.get('.leaflet-control-measure-toggle').should('not.exist');
  });

  it('Display start prompt when hovering (by default)', () => {
    cy.visit('localhost:8080/measure.html');
    cy.get('a.leaflet-control-measure-toggle').trigger('mouseover');
    cy.get('a.js-start').should('be.visible');
  });

  it('Display popup after finished measuring (by default)', () => {
    cy.visit('localhost:8080/measure.html');
    cy.get('a.leaflet-control-measure-toggle').trigger('mouseover');
    cy.get('a.js-start').click();
    cy.get('body').click(114, 257);
    cy.get('body').click(152, 318);
    cy.get('body').dblclick(233, 278);
    cy.get('.leaflet-measure-resultpopup').should('be.visible');
  });
});
