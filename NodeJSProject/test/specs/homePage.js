const BasePage = require('../pageobjects/base.page');
const PageURL = 'https://terapeutica.digital/#/';




describe('Terapeutica', () => {
    before(async ()=> {
        await BasePage.open();
    } )

    describe('Home Page ', () => {

        it.skip('Should valide click on "Buscar" button', async () => {
            await expect(await BasePage.inputSearch).toHaveValueContaining('');
            await BasePage.clickSearch();
            await expect(browser).toHaveUrl(PageURL);
        });

       it('Should show focus on speciality', async () => {
            const list = await BasePage.specialtyLabels;
            for(let index= 0; index < list.length; index++ ){
                let speciality = list[index];
                let element = await speciality.$('//label');
                await element.isClickable();
                /*browser.waitUntil(await element.isClickable, {
                    setTimeout: 2000
                });*/
                element.click();
                console.log(await element.getText());
                
                await expect(await BasePage.inputSearch).toHaveValueContaining('');
                //let x = await browser.$*('#custom-search-input');
                //await x.click();

            }
        });
    })  
});