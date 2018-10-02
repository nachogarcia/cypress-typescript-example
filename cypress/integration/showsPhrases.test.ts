describe('App', function () {
    beforeEach(function () {
        cy.server();
        cy.fixture('RandomPhrasesResponse').as('randomPhrases');
        cy.fixture('MostImportantPhrase').as('mostImportantPhrase')
        cy.route('GET', 'https://api.icndb.com/jokes/random/**',
            '@randomPhrases').as('getRandomPhrases');
        cy.route('GET', 'https://api.icndb.com/jokes/52',
            '@mostImportantPhrase').as('getMostImportantPhrase');
    });

    it('shows 5 random phrases', function () {
        cy.visit('/');

        cy.wait(['@getRandomPhrases'])

        this.randomPhrases.value.forEach((phrase, index) => {
            cy.get('.phrase').eq(index)
                .should('contain', phrase.joke)
        })
    })

    it('shows the most important phrase', function () {
        cy.visit('/');

        cy.wait('@getMostImportantPhrase')

        cy.get('.mostImportantPhrase')
            .should('contain', this.mostImportantPhrase.value.joke)
    })
});