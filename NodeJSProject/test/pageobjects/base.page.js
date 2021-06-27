  
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class BasePage {
    /**
     * define selectors using getter methods
     */
    get btnSearch (){ return $('[class="btn_search"]') }
    get inputSearch () {return $('#search-input')}
    get specialtyLabels () {return $$('//*[@id="custom-search-input"]/ul/li')}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
     async clickSearch () {
        await (await this.btnSearch).click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    async open () {
        return await browser.url('/');
    }
}

module.exports = new BasePage();