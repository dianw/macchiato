process.env.NODE_ENV = 'dev';

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	browserSync = require('browser-sync').create(),
	csslint = require('gulp-csslint'),
	del = require('del'),
	inject = require('gulp-inject'),
	jshint = require('gulp-jshint'),
	minifyCss = require('gulp-minify-css'),
	minifyHtml = require('gulp-minify-html'),
	ngAnnotate = require('gulp-ng-annotate'),
	nodemon = require('gulp-nodemon'),
	plumber = require('gulp-plumber'),
	rev = require('gulp-rev'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	watch = require('gulp-watch'),
	wiredep = require('wiredep').stream;


const dirs = {
	server: {
		src: 'server/main'
	},
	client: {
		src: 'client/main',
		tmp: 'client/tmp',
		dist: 'client/dist'
	}
};

gulp.task('clean:client:tmp', () => {
	del([`${dirs.client.tmp}`]);
});

gulp.task('clean:client:dist', () => {
	del([`${dirs.client.dist}`]);
});

gulp.task('html', () => {
	return gulp.src(`${dirs.client.src}/**/*.html`, { read: false })
		.pipe(plumber())
		.pipe(browserSync.stream({match: '**/*.html'}));
});

gulp.task('scripts:server:lint', () => {
	return gulp.src(`${dirs.server.src}/**/*.js`)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts:client:lint', () => {
	return gulp.src(`${dirs.client.src}/**/*.js`)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('scripts:client:inject', ['scripts:client:lint'], () => {
	const scripts = gulp.src([`${dirs.client.src}/**`, `!${dirs.client.src}/app.js`]);

	return gulp.src(`${dirs.client.src}/index.html`)
		.pipe(inject(scripts, { ignorePath: `${dirs.client.src}`, addRootSlash: false }))
		.pipe(gulp.dest(`${dirs.client.src}`))
		.pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('scripts:client:annotate', ['scripts:client:lint'], () => {
	return gulp.src(`${dirs.client.src}/**/*.js`)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(ngAnnotate())
		.pipe(gulp.dest(`${dirs.client.tmp}/scripts`));
});

gulp.task('styles:lint', () => {
	const dest = `${dirs.client.tmp}/styles`;

	return gulp.src(`${dirs.client.src}/**/*.css`)
		.pipe(plumber())
		.pipe(csslint())
		.pipe(csslint.reporter())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest(dest));
});

gulp.task('styles:inject', ['styles:lint'], () => {
	const dest = `${dirs.client.tmp}/styles`;
	const styles = gulp.src([`${dest}/**`]);

	return gulp.src(`${dirs.client.src}/index.html`)
		.pipe(inject(styles, { ignorePath: `${dirs.client.tmp}`, addRootSlash: false }))
		.pipe(gulp.dest(`${dirs.client.src}`))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('fonts', () => {
	return gulp.src([
			'bower_components/bootstrap/dist/fonts/*',
			'bower_components/font-awesome/fonts/*'
		]).pipe(gulp.dest(`${dirs.client.dist}/fonts`));
});

gulp.task('usemin', ['styles:inject', 'scripts:client:inject', 'scripts:client:annotate'], () => {
	return gulp.src(`${dirs.client.src}/**/*.html`)
		.pipe(usemin({
			css: [ minifyCss, rev ],
			html: [ function () {return minifyHtml({ empty: true });} ],
			js: [ uglify, rev ],
			inlinejs: [ uglify ],
			inlinecss: [ minifyCss, 'concat' ]
		}))
		.pipe(gulp.dest(`${dirs.client.dist}/`));
});

gulp.task('wiredep', () => {
	return gulp.src(`${dirs.client.src}/index.html`)
		.pipe(plumber())
		.pipe(wiredep({
			ignorePath:  /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest(`${dirs.client.src}`))
		.pipe(browserSync.stream());
});

gulp.task('serve:client', ['clean:client:tmp'], () => {
	// initialize browsersync
	browserSync.init({
		port: 3001,
		proxy: 'localhost:3000'
	});

	gulp.start('styles:inject');
	gulp.start('scripts:client:inject');
	gulp.start('wiredep');

	watch([`${dirs.client.src}/**/*.html`], () => {
		gulp.start('html');
	});

	watch(`${dirs.client.src}/**/*.css`, () => {
		gulp.start('styles:inject');
	});

	watch(`${dirs.client.src}/**/*.js`, () => {
		gulp.start('scripts:client:inject');
	});

	watch('bower.json', () => {
		gulp.start('wiredep');
	});
});

gulp.task('serve:server', ['scripts:server:lint'], () => {
	return nodemon({
		ext: 'js',
		ignore: [`${dirs.client.src}/**`],
		script: `${dirs.server.src}/app.js`
	}).on('restart', () => {
		gulp.run('scripts:server:lint');
	});
});

gulp.task('serve', ['serve:server'], () => {
	gulp.run('serve:client');
});

gulp.task('build:client', ['clean:client:tmp', 'clean:client:dist'], () => {
	gulp.start('fonts');
	gulp.start('usemin');
});

gulp.task('build', ['build:client']);
