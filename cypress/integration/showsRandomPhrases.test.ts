describe('App', function () {
    beforeEach(function () {
        cy.server();
        cy.fixture('RandomPhrasesResponse').as('randomPhrases');
        cy.route('GET', 'https://api.icndb.com/jokes/random/**', '@randomPhrases').as('getRandomPhrases');
    });

    it('shows random phrases', function () {
        cy.visit('/');

        cy.wait(['@getRandomPhrases']);

        this.randomPhrases.value.forEach((phrase, index) => {
            cy.get('.phrase').eq(index).should('contain', phrase.joke)
        })
    })
});