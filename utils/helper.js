const HelpersClass = function () {
    this.header = $('.l-header');
    this.topValidation = $('.tips-container');
    this.topError = this.topValidation.$('.message-error');
    this.topSuccess = this.topValidation.$('.message-success');
    this.topInfo = this.topValidation.$('.message-info');
    this.noDataInfo = $('.no-data');
};
  
/* wrap synchronous action into the promise */
const getEmptyPromise = function () {
    return browser.sleep(0);
};
  
HelpersClass.prototype.log = function (message) {
    return getEmptyPromise()
        .then(function () {
            if (browser.params.debugLevel >= 2) {
                console.log('[INFO] ' + message);
            }
        });
};
  
HelpersClass.prototype.isVisible = (el) => {
    return el.isPresent()
        .then(function (p) {
            if (p) {
                return el.isDisplayed();
            } else {
                return p;
            }
        });
};
  
HelpersClass.prototype.acceptAlert = function () {
    return browser.get('/')
        .then(function () {
            browser.sleep(500);
        })
        .then(function () {
            browser.driver.switchTo().alert().then(
                function (alert) {
                    alert.accept();
                }, function () {
                    console.log('No alert displayed');
                });
        });
};
  
HelpersClass.prototype.scrollToAndClick = function (el) {
    return this.scrollToElement(el)
        .then(function () {
            return el.click();
        });
};
  
HelpersClass.prototype.dragElement = function (dragElement, offsetX, offsetY) {
    const waiter = require('../common/waiter.js'); // todo: known issue - needs to be checked
    return dragElement.click()
        .then(function () {
            waiter.waitForElement(dragElement, 1000);
            return browser.actions().mouseDown(dragElement).perform(); // hold mouse button on element to drag
        })
    // somehow drag and drop works while splitting in two functions: move to destination area and then to exact point, needs to be checked
        .then(function () {
            return browser.actions().mouseMove(dragElement, {
                x: offsetX,
                y: offsetY
            }).perform(); // move to exact point
        })
        .then(function () {
            browser.sleep(500);
            return browser.actions().mouseUp().perform(); // release mouse button, element is put on destination point
        });
};
  
module.exports = new HelpersClass();
  