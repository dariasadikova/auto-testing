import { describe, before, after, it } from 'mocha';
import assert from 'assert';
import { MarketPage } from '../pages/marketpage.js';
import { Builder } from 'selenium-webdriver';
import path from 'path';

describe('Yandex Market Discount Filter Test', function() {
    this.timeout(50000);
    let driver;
    let marketPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        marketPage = new MarketPage(driver);
    });

    after(async function () {
        await marketPage.shutdown();
    });

    it('Should filter discounted products correctly', async function () {
        try {
            await marketPage.navigate('https://market.yandex.ru');
            await marketPage.selectCategory();
            const products = await marketPage.logFirstFiveLaptops();
            console.log('First five products:', products);
            await marketPage.applyDiscountFilter();
            const discountedProducts = await marketPage.checkDiscountsOnTenProducts();
            console.log('Discounted products:', discountedProducts);
            discountedProducts.forEach(product => {
                assert(product.discountLabel.includes('Уценка'), 'Product is not marked as discounted');
            });

        } catch (error) {
            const testName = this.test.title.replace(/\s+/g, '_');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filePath = path.join(__dirname, `${testName}_${timestamp}.png`);
            await yandexMarket.saveScreenshot(filePath);
            console.error(`Test failed: ${error.message}`);
            assert.fail(`Test failed: ${error.message}`);
        }
    
    });


});
