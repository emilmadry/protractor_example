exports.config = {
    framework: 'jasmine',
    drivers: {
        chrome: {
            version: '2.31',
            arch: process.arch,
            baseURL: 'https://www.accuweather.com'
        }
    },
    specs: ['../tests/spec.js'],
    capabilities: {
        browserName: 'chrome'
    }
};
