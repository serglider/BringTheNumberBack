const gulp = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const open = require('gulp-open');
const zip = require('gulp-zip');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;

gulp.task('clean', function () {
    del.sync(['build/**', '!build']);
});

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});

gulp.task('reload', function () {
    setTimeout(function () {
        gulp.src('index.html').pipe(connect.reload());
    }, 1000);
});

gulp.task('html', () => {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, removeComments: true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('font', () => {
    return gulp.src('fonts/**')
        .pipe(gulp.dest('./build'));
});

gulp.task('zip', function () {
    const date = new Date(),
        vers = (date.getMonth() + 1) + '_' + date.getDate();
    return gulp.src('build/**')
        .pipe(zip('app_' + vers + '.zip'))
        .pipe(gulp.dest('./submission'));
});

gulp.task('compile', ['clean', 'html', 'font'], function () {
    return gulp.src(['./src/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/*.js', 'index.html'], ['compile', 'reload']);
});

gulp.task('open', function () {
    gulp.src('').pipe(open({
        uri: 'http://localhost:8080//build/index.html'
    }));
});

gulp.task('default', ['connect', 'compile', 'open', 'watch']);
