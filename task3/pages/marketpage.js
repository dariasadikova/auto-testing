import WebPage from "./basepage.js";
import { By, until } from "selenium-webdriver";

export class MarketPage extends WebPage {
    constructor(driver) {
        super(driver);
        this.url = 'https://market.yandex.ru';
        this.catalogButton = By.xpath("//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']");
        this.laptopsAndComputers = By.xpath("//span[contains(text(), 'Ноутбуки и компьютеры')]");
        this.laptopsSubcategory = By.xpath("//li//a[@href='/catalog--noutbuki/54544/list?hid=91013']");
        this.Laptops = By.xpath("//h3[@data-auto='snippet-title']");
        this.discount = By.xpath("//span[@class='_3nYr7']");
        this.productPrices = By.xpath("//div[@data-auto-themename='listDetailed']//span[@data-auto='snippet-price-current']");
    }


    async selectCategory() {
        await this.clickElement(this.catalogButton);
        await this.driver.sleep(5000);
        let laptopsAndComputers = await this.driver.findElement(this.laptopsAndComputers);
        await this.driver.actions({ async: true }).move({ origin: laptopsAndComputers}).perform();
        await this.driver.sleep(1000);
        await this.clickElement(this.laptopsSubcategory);
        await this.driver.sleep(3000);
        console.log('Страница ноутбуков открыта');
    }



    async logFirstFiveLaptops() {
        let laptops = await this.driver.findElements(this.Laptops);
        let count = Math.min(laptops.length, 5);
    
        console.log('Первые пять ноутбуков (или меньше, если доступно меньше пяти):');
        for (let i = 0; i < count; i++) {
            let name = await laptops[i].getText();
            let priceElement = await laptops[i].findElement(this.productPrices);
            let price = await priceElement.getText();
            let discountLabels = await laptops[i].findElements(By.className("_2Vt2k")); 
            let discountText = discountLabels.length > 0 ? 'Уценка' : 'Без уценки';
    
            console.log(`Ноутбук ${i + 1}: ${name} - ${price}, ${discountText}`);
        }
    }

    async applyDiscountFilter() {
        await this.driver.wait(until.elementLocated(this.discount), 5000);
        await this.clickElement(this.discount);
    }
    
    async checkDiscountsOnTenProducts() {
        let products = await this.driver.findElements(this.laptops);
        let count = Math.min(products.length, 10);
        console.log('Проверка первых десяти товаров на наличие уценки:');
        for (let i = 0; i < count; i++) {
            let discountLabels = await products[i].findElements(By.className("_2Vt2k"));
            assert(discountLabels.length > 0, `Товар ${i + 1} не имеет плашки уценки, хотя должен.`);
            console.log(`Товар ${i + 1} имеет плашку уценки.`);
        }
    }

}


