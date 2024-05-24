import WebPage from './basepage.js';
import {By, Key } from 'selenium-webdriver';


export class ScheduleManager extends WebPage {
    async navigateToHomepage() {
        await this.navigate('https://mospolytech.ru/');
    }

    async closeBrowser() {
        this.shutdown()
    }

    async goToScheduleSection() {
        await this.clickElement(By.xpath('//ul[@class="user-nav__list"]//a[@href="/obuchauschimsya/raspisaniya/"]'));
        await this.driver.sleep(1500);
    }

    async launchScheduleViewer() {
        this.primaryWindow = await this.driver.getWindowHandle();
        await this.clickElement(By.xpath('//a[@href="https://rasp.dmami.ru/"]'));
        await this.driver.sleep(1000);
    }

    async enterGroupDetails() {
        const windows = await this.driver.getAllWindowHandles();
        for (const handle of windows) {
            if (handle !== this.primaryWindow) {
                await this.driver.switchTo().window(handle);
            }
        }

        await this.typeText(By.xpath('//input[@class="groups"]'), '221-321');
        await this.driver.findElement(By.xpath('//input[@class="groups"]')).sendKeys(Key.ENTER);
        await this.driver.sleep(2000);
    }

    async confirmGroupExistence() {
        return !!await this.driver.findElement(By.xpath('//div[@id="221-321"]'));
    }

    async selectGroupSchedule() {
        await this.clickElement(By.xpath('//div[@id="221-321"]'));
        await this.driver.sleep(2000);
    }

    async validateCurrentDayHighlight() {
        const todayIndex = new Date().getDay();
        return (await this.driver.findElement(By.xpath(`//div[@class="schedule-week"]/child::div[position()=${todayIndex}]`)).getAttribute('class')).includes('schedule-day_today');
    }
}






