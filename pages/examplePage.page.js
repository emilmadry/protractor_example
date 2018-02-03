// import { browser } from 'protractor';

const helper = require('../utils/helper');
const waiter = require('../utils/waiter');

const examplePage = function () {
    this.cookiesBar = $('#eu-cookie-notify-wrap');
    this.locator = $('#home');
//   this.contextMenu = this.overlay.$('.c-context-menu__items-container')
//   this.author = this.contextMenu.element(by.cssContainingText('.c-context-menu__item', 'Me'))
};
examplePage.prototype.openExamplePage = function () {
    let self = this;
    return browser.get('/')
        .then(() => waiter.waitForElement(self.locator, 5000));
};
examplePage.prototype.acceptCookies = () => {
    if (helper.isVisible(this.cookiesBar)) {
        this.cookiesBar.click();
    }
};

module.exports = examplePage;
