(function() {

    'use strict';

    require('dotenv').load();

    global.isProd = (process.env.APP_ENV == "production" || process.env.APP_ENV == "uat");

    require('./gulp');
})();
