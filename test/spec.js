

describe('Search Index', function(){

    beforeEach(function(){
        cy.visit('/test/res/list-of-links.html');
        cy.window().invoke('getSearchIndex').as('SearchIndex');
    });

    it('Should index empty selector', function(){
        expect(new this.SearchIndex('#wrong').items).to.have.lengthOf(0);
    });

    it('Should index all found elements', function(){
        let idx = new this.SearchIndex('a');
        expect(idx.items).to.have.lengthOf(3);
        expect(idx.items[1].text).to.equal('foobar');
        expect(idx.items[2].text).to.equal('foobarbaz');
    });

    it('Should store case-sensitive data', function(){
        let idx = new this.SearchIndex('a', true);
        expect(idx.items[1].text).to.equal('fooBar');
    });

});

describe('SearchBar', function(){

    beforeEach(function(){
        cy.visit('/test/res/list-of-links.html');
        cy.window().invoke('getSearchBar').as('SearchBar');
        cy.window().invoke('getHTMLElement').as('HTMLElement');
        cy.window().invoke('getSearchIndex').as('SearchIndex').then(() => {
            cy.wrap(new this.SearchIndex('a')).as('idx');
        });
    });

    describe('Construction', function(){

        it('Should fail when given invalid index', function(){
            expect(() => new this.SearchBar('input', null)).to.throw(/Invalid search index/);
        });

        it('Should attach itself to input element', function(){
            cy.get('input').then($el => {
                let bar = new this.SearchBar($el[0], this.idx);
                expect(bar.element).to.be.an.instanceof(this.HTMLElement);
            });
        });

        it('Should get input element from selector', function(){
            cy.get('input').then(() => {
                let bar = new this.SearchBar('input', this.idx);
                expect(bar.element).to.be.an.instanceof(this.HTMLElement);
            });
        });

    });

    describe('Usage', function(){

        beforeEach(function(){
            cy.get('input').as('elem').then($el => {
                let bar = new this.SearchBar($el[0], this.idx);
                cy.wrap(bar).as('bar');
            });
        });

        it('Should hide elements that don\'t match the search', function(){
            cy.get('@elem').type('h').then(() => {
                cy.get('a').each( a => {
                    cy.wrap(a).should('have.css', 'display', 'none');
                });
            });
        });

        it('Should do nothing when all elements match the search', function(){
            cy.get('@elem').type('f').wait(1000).then(() => {
                cy.get('a').each( a => {
                    cy.wrap(a).should('not.have.css', 'display', 'none');
                });
            });
        });

        it('Should not search before setup delay [delay]', function(){
            this.bar.delay = 11000;
            cy.get('@elem').type('h').then(() => {
                cy.get('a').each( a => {
                    cy.wrap(a).should('not.have.css', 'display', 'none');
                });
            });
        });

        it('Should show all elements when search bar gets empty', function(){
            cy.get('@elem').type('h').wait(1000).then(() => {
                cy.get('@elem').clear().then(() => {
                    cy.get('a').each( a => {
                        cy.wrap(a).should('not.have.css', 'display', 'none');
                    });
                });
            });
        });

        it('Should search according to index case sensitiveness', function(){
            this.bar.index = new this.SearchIndex('a', true);
            cy.get('@elem').type('B').then(() => {
                cy.get('a').eq(0).should('have.css', 'display', 'none');
                cy.get('a').eq(1).should('not.have.css', 'display', 'none');
                cy.get('a').eq(2).should('have.css', 'display', 'none');
            });
        });

        it('Should search any word', function(){
            this.bar.any = true;
            cy.get('@elem').type('B z').wait(1000).then(() => {
                cy.get('a').each( a => {
                    cy.get('a').eq(0).should('have.css', 'display', 'none');
                    cy.get('a').eq(1).should('not.have.css', 'display', 'none');
                    cy.get('a').eq(2).should('not.have.css', 'display', 'none');
                });
            });
        });

    });

});

after(function(){
    cy.window().then(win => {
        if(typeof win.__coverage__ == 'object')
            cy.writeFile('.nyc_output/out.json', JSON.stringify(win.__coverage__));
    });
});
