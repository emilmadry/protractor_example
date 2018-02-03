const helper = require('../utils/helper');
const waiter = require('../utils/waiter');
const log = helper.log;
const examplePage = require('../pages/examplePage.page');

describe('It will test functions of example page', function() {
    const currentCountry = $('.current-country');
    const location = $('#header-logo');
    browser.ignoreSynchronization = true;

    beforeEach(function() {
        // browser.get('http://juliemr.github.io/protractor-demo/');
        browser.get('https://www.accuweather.com/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Poland Weather - AccuWeather.com');
    });

    it('should check current country', function() {
        expect(currentCountry.getText()).toEqual('Poland');
    });
    
    it('should check the cookies message', function() {
        return location.click()
            .then(() => {
                expect(location.isPresent()).toBeTruthy();
                expect(examplePage.cookiesBar.getText()).toEqual('This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. Find out more here');
            });
    });
});
