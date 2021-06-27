  
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class SearchPage {
    /**
     * define selectors using getter methods
     */

    get specialtyBtn() {return $$('.switch-field a')}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    /**
     * overwrite specifc options to adapt it to page object
     */
    async open () {
        return await browser.url('https://terapeutica.digital/#/search');
    }
}

module.exports = new SearchPage();
