const gulp = require('gulp')
const $ = require('gulp-load-plugins')();


// Transpile all JS to ES5.
gulp.task('js', function() {
    return gulp.src(['src/loki-cordova-fs-adapter.es6'])
        .pipe($.babel({
            presets: ['es2015'],
            plugins: [
			    "add-module-exports", "transform-es2015-modules-umd"
			]
        }))
        .pipe(gulp.dest('bin/'));
});