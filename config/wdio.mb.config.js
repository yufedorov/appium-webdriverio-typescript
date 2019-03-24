/**
 * WebdriverIO config file to run tests on native mobile apps.
 * Config file helps us configure all the settings and setup environments 
 * to run our tests.
 */

const host = '127.0.0.1';   // default appium host
const port = 4730;          // default appium port

const waitforTimeout = 30 * 60000;
const commandTimeout = 30 * 60000;

exports.config = {
    debug: false,
    specs: [
        './features/mb.feature',
    ],

    reporters: ['allure','spec'],
    reporterOptions: {
        allure: {
            outputDir: './allure-results/'
        }
    },

    host: host,
    port: port,

    maxInstances: 1,

    capabilities: [
        {
            appiumVersion: '1.8.1',                 // Appium module version
            browserName: '',                        // browser name is empty for native apps
            platformName: 'Android',
            app: '.\\app\\app-debug.apk',          // Path to your native app
            appPackage: 'ru.borlas.mobilemonitor.phosagro',  // Package name of your app
            //platformVersion: '5.1.1',              // Android platform version of the device
            deviceName: 'YSLFY9VSEMTOLZQW',              // device name of the mobile device
            autoWebview: true,
			chromedriverExecutableDir:'.\\chromedriver',
			chromedriverChromeMappingFile:'.\\chromedriver\\map.json',
			waitforTimeout: waitforTimeout,
            commandTimeout: commandTimeout,
            newCommandTimeout: 30 * 60000,
            autoGrantPermissions: true,
            noReset: false,
        }
    ],

    services: ['appium'],
    appium: {
        waitStartTime: 6000,
        waitforTimeout: waitforTimeout,
        command: 'appium.cmd',
        logFileName: 'appium.log',
        args: {
            address: host,
            port: port,
            commandTimeout: commandTimeout,
            sessionOverride: true,
            debugLogSpacing: true
        }
    },

    /**
     * test configurations
     */
    logLevel: 'silent',
    coloredLogs: true,
    framework: 'cucumber',          // cucumber framework specified 
    cucumberOpts: {
        compiler: ['ts:ts-node/register'],
        backtrace: true,
        failFast: false,
        timeout: 5 * 60 * 60000,
        require: ['./stepDefinitions/mbSteps.ts']      // importing/requiring step definition files
    },

    /**
     * hooks help us execute the repeatitive and common utilities 
     * of the project.
     */
    onPrepare: function () {
        console.log('<<< HYBRID APP TESTS STARTED >>>');
    },


    onComplete: function () {
        console.log('<<< TESTING FINISHED >>>');
    }

};
