  
/**
 * sub page containing specific selectors and methods for a specific page
 */
 class SearchPage {
    /**
     * define selectors using getter methods
     */

    get specialtyBtn() {return $$('.switch-field a')}
    get inputTypeSearch() {return $('.search_bar_list input[type=search]')}
    get inputTypeSubmit() {return $('.search_bar_list input[type=submit]')}
    get elementSearched() {return $('.strip_list h3')}
    get emptyResultText() {return $('.container>p')} 
    get iconList() {return $('.icon-th-list')}
    get map() {return $('#map.google-map')}
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
     async doSearch (searchText) {     
        await (await this.inputTypeSearch).setValue(searchText);
        await (await this.inputTypeSubmit).click();
    }

    async doClickOnList () {     
        await (await this.iconList).click();
    }
   
    /**
     * overwrite specifc options to adapt it to page object
     */
    async open () {
        return await browser.url('https://terapeutica.digital/#/search');
    }
}

module.exports = new SearchPage();
