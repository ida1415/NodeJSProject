  
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class BasePage {
    /**
     * define selectors using getter methods
     */
    get btnSearch (){ return $('[class="btn_search"]') }
    get inputSearch () {return $('#search-input')}
    get specialtyLabels () {return $$('#custom-search-input ul li label')}
    get modalSearch () {return $('.overlay')} 
    get elementSearched() {return $('.strip_list h3')}
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
     async clickSearch () {
        await (await this.btnSearch).click();
    }

    async removeSearchFocus () {
        await (await this.modalSearch).click();
    }

    async doSearch (searchText) {     
        await (await this.inputSearch).click();
        await (await this.inputSearch).setValue(searchText);
        await (await this.btnSearch).click();
    }

    async getInvarianceTextResult () {   
        let text = await (await this.elementSearched).getText();  
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();     
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    async open () {
        return await browser.url('/');
    }
}

module.exports = new BasePage();
