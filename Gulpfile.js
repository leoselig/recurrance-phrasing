var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var gulpMocha = require('gulp-mocha');
var gulpKarma = require('gulp-karma');
var gulpRename = require('gulp-rename');
var gulpBrowserify = require('gulp-browserify');
var karmaConfig = require('./karma.conf.js');

gulp.task('test.node', function() {
    return gulp.src('test/**/*.js')
        .pipe(gulpMocha());
});

gulp.task('test.browserify', function() {
    gulp.src('test/**/*.js')
        .pipe(gulpBrowserify())
        .pipe(gulp.dest('./build/test'));
});

gulp.task('test.browser', [
    'test.browserify'
], function(done) {
    return gulp.src('build/test/**/*.js')
        .pipe(gulpKarma({
            configFile: './karma.conf.js'
        }));
});

gulp.task('test', [
    'test.node',
    'test.browser'
], function() {});

gulp.task('test.watch', function() {
    return gulpWatch([
        'index.js',
        'test/**/*.js',
        'i18n/*.json'
    ], function(files, done) {
        gulp.start('test.run');
    });
});

gulp.task('browserify', function() {
    gulp.src('browser.js')
        .pipe(gulpBrowserify())
        .pipe(gulpRename({
            basename: 'reccurance-phrasing'
        }))
        .pipe(gulp.dest('./build'));
});
