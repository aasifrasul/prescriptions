module.exports = function(config) {
    config.set({

        basePath: '../',

        files: [
            'test/lib/console.js',
            'test/lib/jquery-1.8.3.js',
            'test/lib/jasmine.js',
            'test/lib/jasmine.async.js',
            'test/lib/jasmine-html.js',
            //'test/lib/jasmine-jquery-settings/jasmine_spec_runner_fixtures_path.js',
            'test/lib/jasmine-jquery-1.4.2.js',
            'test/lib/jasmine.console_reporter.js',
            'main/webapp/app/lib/angular/angular.js',
            'main/webapp/app/lib/ui.sortable.js',
            'main/webapp/app/lib/ngDraggable.js',
            'main/webapp/app/lib/angular-ui/ui-grid-3.0.0-RC.18.js',
            'main/webapp/app/lib/angular/angular-translate.min.js',
            'main/webapp/app/lib/angular/angular-translate-loader-static-files.min.js',
            'main/webapp/app/lib/angular/angular-ui-router.js',
            'main/webapp/app/lib/angular/angular-animate.js',
            'main/webapp/app/lib/angular-ui/ui-bootstrap-tpls-0.10.0.js',
            'main/webapp/app/lib/jquery/jquery-ui.min.js',
            'main/webapp/app/lib/d3/d3.js',
            'main/webapp/app/lib/d3/nv.d3.js',
            'main/webapp/app/lib/d3/angularjs-nvd3-directives.js',
            'main/webapp/app/lib/angular/restangular.min.js',
            'main/webapp/app/lib/underscore/underscore-min.js',

            'main/webapp/app/js/**/*.js',

            'test/lib/angular/angular-mocks.js',
            'test/unit/services/*.js'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        colors: true,

        captureTimeout: 5000,

        logLevel: config.LOG_DEBUG,

        // list of files to exclude
        exclude: ['test/unit/appSpec.js', 'test/unit/SpecRunner.html'],

        preprocessors: {
            //'main/webapp/app/js/**/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'text'
        },

        runnerPort: 9100,

        reporters: ['nested', 'coverage'],

        nestedReporter: {
            color: {
                should: 'red',
                browser: 'yellow'
            },
            icon: {
                failure: '✘ ',
                indent: 'ட ',
                browser: ''
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        singleRun: false

    });
}