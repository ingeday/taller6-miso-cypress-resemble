context('Screenshots color palette', () => {
    it('Opens the color palette app and takes a screenshot before and after generating the color palette', () => {
        cy.visit('https://miso4208-taller6-colorpalette.glitch.me/');
        cy.get('a').click();

        let now = new Date();
        let epoch = Math.round(now.getTime() / 1000);
        
        cy.screenshot('base_' + epoch, {'capture': 'fullPage'});
        cy.get('#actions > div:nth-child(3) > button:nth-child(1)').click();
        cy.get('#actions > div:nth-child(3) > button:nth-child(2)').click();
        cy.screenshot('test_' + epoch, {'capture': 'fullPage'});
    });
});