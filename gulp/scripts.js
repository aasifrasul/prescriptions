(function() {

    'use strict';

    var gulp = require('gulp');
    var header = require('gulp-header');
    var footer = require('gulp-footer');
    var concat = require('gulp-concat');
    var jshint = require('gulp-jshint');
    var cached = require('gulp-cached');
    var streamify = require('gulp-streamify');
    var uglify = require('gulp-uglify');
    var remember = require('gulp-remember');
    var rev = require('gulp-rev');

    var scriptsGlob = 'app/js/**/*.js';

    gulp.task('scripts', function() {
        return gulp.src(scriptsGlob)
            .pipe(cached('scripts')) // only pass through changed files
            .pipe(jshint()) // do special things to the changed files...
            //.pipe(header('(function () {')) // e.g. jshinting ^^^
            //.pipe(footer('})();'))          // and some kind of module wrapping
            .pipe(remember('scripts')) // add back all files to the stream
            .pipe(streamify(uglify({
                compress: { unused: true, dead_code: true },
                mangle: false
            })))
            .pipe(concat('app.js')) // do things that require all files
            .pipe(rev())
            .pipe(gulp.dest('public/js/'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('public/js/'));
    });

    gulp.task('watch', function() {
        var watcher = gulp.watch(scriptsGlob, ['scripts']); // watch the same files in our scripts task
        watcher.on('change', function(event) {
            if (event.type === 'deleted') { // if a file is deleted, forget about it
                delete cached.caches.scripts[event.path]; // gulp-cached remove api
                remember.forget('scripts', event.path); // gulp-remember remove api
            }
        });
    });

}());