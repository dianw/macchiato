process.env.NODE_ENV = 'dev';

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	csslint = require('gulp-csslint'),
	del = require('del'),
	inject = require('gulp-inject'),
	jshint = require('gulp-jshint'),
	nodemon = require('gulp-nodemon'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	wiredep = require('wiredep').stream;

const dirs = {
	server: {
		src: 'server/main'
	},
	client: {
		src: 'client/main',
		tmp: 'client/tmp'
	}
};

gulp.task('clean:client', () => {
	del([`${dirs.client.tmp}`]);
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

gulp.task('wiredep', () => {
	return gulp.src(`${dirs.client.src}/index.html`)
		.pipe(plumber())
		.pipe(wiredep({
			ignorePath:  /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest(`${dirs.client.src}`))
		.pipe(browserSync.stream());
});

gulp.task('serve:client', ['scripts:server:lint'], () => {
	// initialize browsersync
	browserSync.init({
		port: 3001,
		proxy: 'localhost:3000'
		// serveStatic: [`${dirs.client.src}`]
		// server: {
		// 	baseDir: `${dirs.src}`,
		// 	routes: {
		// 		'/bower_components': 'bower_components',
		// 		'/styles': `${dirs.tmp}/styles`,
		// 		'/scripts': `${dirs.tmp}/scripts`
		// 	}
		// }
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
