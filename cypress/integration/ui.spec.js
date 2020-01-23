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

  it('Hide labels during measuring (by default)', () => {
    cy.visit('localhost:8080/measure.html');
    cy.get('a.leaflet-control-measure-toggle').trigger('mouseover');
    cy.get('a.js-start').click();
    cy.get('body').click(114, 257);
    cy.get('.measure-label').should('not.exist');
  });

  it('Display labels during measuring if that was specified', () => {
    cy.visit('localhost:8080/measure.html?options={"ui":{"labels":true, "control":true}}');
    cy.get('a.leaflet-control-measure-toggle').trigger('mouseover');
    cy.get('a.js-start').click();
    cy.get('body').click(114, 257);
    cy.get('.measure-label').should('be.visible');
  });

  it('Display labels for every point of measure', () => {
    cy.visit('localhost:8080/measure.html?options={"ui":{"labels":true, "control":true}}');
    cy.get('a.leaflet-control-measure-toggle').trigger('mouseover');
    cy.get('a.js-start').click();
    cy.get('body').click(114, 257);
    cy.get('body').click(152, 318);
    cy.get('body')
      .find('.measure-label')
      .should('have.length', 2);
  });

  it('Finish measuring correctly if measuring now', () => {
    cy.visit('localhost:8080/measure.html?options={"ui":{"control":false}}');
    cy.get('#start').click();
    cy.get('body').click(114, 257);
    cy.get('body').click(152, 318);
    cy.get('#finish').click();
  });

  it('Finish measuring clearing popup if measuring finished', () => {
    cy.visit('localhost:8080/measure.html?options={"ui":{"control":false}}');
    cy.get('#start').click();
    cy.get('body').click(114, 257);
    cy.get('body').click(152, 318);
    cy.get('body').dblclick(233, 278);
    cy.get('#finish').click();
    cy.get('.leaflet-measure-resultpopup').should('not.exist');
  });
});
