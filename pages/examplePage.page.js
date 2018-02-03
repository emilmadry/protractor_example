const helper = require('../utils/helper');
const waiter = require('../utils/waiter');

let examplePage = function() {
    this.cookiesBar = $('#eu-cookie-notify-wrap');
    this.locator = $('#home');
    // const pageLogo = $('#header-logo');
  
    this.openExamplePage = () => {
        return browser.get('/')
            .then(() => waiter.waitForElement(this.locator, 5000));
    };
  
    this.acceptCookies = () => {
        if (this.cookiesBar.isPresent()) {
            return this.cookiesBar.click();
        } else {
            console.log('No cookie message visible');
        }
    };
};

module.exports = new examplePage();
