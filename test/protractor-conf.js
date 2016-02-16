exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e/specs/*.js'
    ],
/*
    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path,
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
        //shardTestFiles: true,
        //maxInstances: 2
    },
*/
    capabilities: {
        browserName: 'chrome'
        //shardTestFiles: true,
        //maxInstances: 2
    },

    //chromeOnly: true,

    //directConnect: true,

    //chromeDriver: 'C:/Users/Aasif Rasul/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver.exe',

    //seleniumServerJar: 'C:/Users/Aasif Rasul/AppData/Roaming/npm/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

    chromeDriver: 'd:/Code/lucasware/lucas-amd/src/node_modules/protractor/selenium/chromedriver.exe',

    seleniumServerJar: 'd:/Code/lucasware/lucas-amd/src/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

    baseUrl: 'http://localhost:8080/amd/',

    onPrepare: function() {
        browser.driver.manage().window().maximize();
        //browser.ignoreSynchronization = true;
    },

    framework: 'jasmine',

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        //defaultTimeoutInterval: 360000,
        //includeStackTrace: true
    }

    /*jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }*/
};
