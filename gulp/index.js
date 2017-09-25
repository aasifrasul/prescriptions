(function() {

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('compile', function(cb) {

        cb = cb || function() {};

        global.isProd = false;

        runSequence('clean', 'scripts', cb);

    });

})();