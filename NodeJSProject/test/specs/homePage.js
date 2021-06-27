const BasePage = require('../pageobjects/base.page');
const searchPage = require('../pageobjects/search.page');
const PageURL = 'https://terapeutica.digital/#/';
const SearchPage = require('../pageobjects/search.page');
const webPageURL = 'https://terapeutica.digital/#/specialist/bfea3295-af20-4824-8bed-170a227bc1e6';


describe('Terapeutica', () => {
    before(async ()=> {
        await BasePage.open();
    } )

    describe('Part I ', () => {

        it('Should valide click on "Buscar" button', async () => {
            await expect(await BasePage.inputSearch).toHaveValueContaining('');
            await BasePage.clickSearch();
            await expect(browser).toHaveUrl(PageURL);
        });

       it('Should show focus on speciality', async () => {
            const list = await BasePage.specialtyLabels;
            const specialityPlaceHolder = '¿Buscas a alguien o algo en específico?'

            for(let index= 0; index < list.length; index++ ){
                let element = list[index];
                await element.isClickable();
                await element.click();
                await expect (await BasePage.inputSearch).toBeFocused();
                await expect(await BasePage.inputSearch).toHaveElementProperty('placeholder',specialityPlaceHolder);
                await BasePage.removeSearchFocus();
            }
        });

        it('Should validate search Maria and result', async () => {
            const searchName = 'maria';
            const urlResults = 'https://terapeutica.digital/#/search?sp=ocupational&q='+ searchName;

            await BasePage.doSearch(searchName);
            await expect(browser).toHaveUrl(urlResults);
            await expect(await BasePage.getInvarianceTextResult()).toContain(searchName);
        });  

    });  

    describe('Part II ', () => {

        beforeEach(async ()=> {
            await SearchPage.open();
        } )

        it('Should valide click on Specialty button the URL is changing', async () => {
            const list = await SearchPage.specialtyBtn;
            const specialtyURLs = ['https://terapeutica.digital/#/search?sp=phisical', 
            'https://terapeutica.digital/#/search?sp=language', 
            'https://terapeutica.digital/#/search?sp=ocupational'];
            
            for(let index= 0; index < list.length; index++ ){
                let btn = list[index];
                await btn.click();
                await expect(browser).toHaveUrl(specialtyURLs[index]);
                
            }
        });

        it('Should validate search Maria and result on Search Page', async () => {
            const searchName = 'maria';
            await searchPage.doSearch(searchName);
            await expect(await BasePage.getInvarianceTextResult()).toContain(searchName);
        });

        it('Should validate invalid search and result on Search Page', async () => {
            const searchName = 'idania';
            await searchPage.doSearch(searchName);
            await expect(await SearchPage.emptyResultText).toExist();
        });

        it('Should validate map is not visible', async () => {
            await SearchPage.doClickOnList();
            await expect(await SearchPage.map).not.toBeDisplayed();
        });
    });

    describe('Part III ', () => {

        before(async ()=> {
            await browser.url(webPageURL);
        } )

        it('Verify WebService Request', () => {
                const webServiceURL = 'https://javito-prod.herokuapp.com/v1/specialist/bfea3295-af20-4824-8bed-170a227bc1e6';

                browser.cdp('Network', 'enable')
                browser.on('Network.responseReceived', (params) => {
                    if(params.response.url == webServiceURL){
                        console.log(params.response);
                        expect(params.response.status).toEqual(200);
                        expect(params.response.url).toEqual(webServiceURL);
                        expect(params.response.statusText).toEqual('OK');
                    }
                })
                browser.url(webPageURL);
            });
        });
});