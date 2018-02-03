const helper = require('../utils/helper');
const log = helper.log;

const Waiter = function () {
    this.logo = $('#header-logo');
    this.mainPanel = $('#panel-main');
};

Waiter.prototype.waitForElement = (el, timeout) => {
    const selector = el.locator();
    let waitMsec = 30000;
    if (timeout) {
        waitMsec = timeout;
    }
    return browser.wait(() => {
        return el.isPresent().then((p) => {
            if (p) {
                return el.isDisplayed()
                    .then(function (d) {
                        return d;
                    });
            } else {
                return p;
            }
        });
    }, waitMsec, 'Waiter.waitForElement: Element [' + selector + '] didn\'t appear')
        .then(function () {
            if (browser.params.debugLevel >= 3) {
                return log('---- Waiting done for \'' + selector);
            }
        });
};

// wait for page title to appear
Waiter.prototype.waitForTitle = () => this.waitForElement(this.logo, 5000);

Waiter.prototype.waitForMainPanel = () => this.waitForElement(this.mainPanel, 5000);

// wait for page landing page to fully load
Waiter.prototype.waitForLandingPage = () => {
    return this.waitForTitle()
        .then(function () {
            return this.waitForMainPanel();
        });
};

// will retry clicking on element until success or timeout
Waiter.prototype.tryToClick = function (el) {
    const selector = el.locator();
    return browser.wait(function () {
        return el.click()
            .then(function () {
                return true;
            }, function () {
                return false;
            });
    }, 20000, 'The element [' + selector + '] couldn\'t be clicked within given timeout');
};

module.exports = new Waiter();
