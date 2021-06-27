const BasePage = require('../pageobjects/base.page');
const PageURL = 'https://terapeutica.digital/#/';
const SearchPage = require('../pageobjects/search.page');


describe('Terapeutica Part I', () => {
    before(async ()=> {
        await BasePage.open();
    } )

    describe('Part I ', () => {

        it.skip('Should valide click on "Buscar" button', async () => {
            await expect(await BasePage.inputSearch).toHaveValueContaining('');
            await BasePage.clickSearch();
            await expect(browser).toHaveUrl(PageURL);
        });

       it.skip('Should show focus on speciality', async () => {
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

        it.skip('Should validate search Maria and result', async () => {
            const searchName = 'maria';
            const urlResults = 'https://terapeutica.digital/#/search?sp=ocupational&q='+ searchName;

            await BasePage.doSearch(searchName);
            await expect(browser).toHaveUrl(urlResults);
            await expect(await BasePage.getInvarianceTextResult()).toContain(searchName);
        });  

    });  
});

describe('Part II ', () => {
    before(async ()=> {
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

});