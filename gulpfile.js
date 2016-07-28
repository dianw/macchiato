process.env.NODE_ENV = 'dev';

const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber');

const dirs = {
	srcServer: 'server/main'
};

gulp.task('lint:server', () => {
    return gulp.src(`${dirs.srcServer}/**/*.js`)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve:server', ['lint:server'], () => {
    nodemon({
        script: `${dirs.srcServer}/app.js`,
        ext: 'js'
    }).on('restart', () => {
        gulp.run('lint:server');
    });
});

gulp.task('serve', () => {
    gulp.run('serve:server');
});
