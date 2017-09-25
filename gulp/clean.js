(function() {

	'use strict';

	var gulp 	= require('gulp');
	var del 	= require('del');

	gulp.task('clean', function(cb) {
	    console.log("clean task");
		return del([
			'../public/js'
			], cb);
	});
})();