'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
const server = browserSync.create();

const paths = {
    scripts: {
        src: 'src/js/*.js',
        dest: 'dist/js/'
    },
    styles: {
        src: 'src/scss/*.scss',
        dest: 'dist/css/'
    }
};


// Browsersync 
function serve() {
    server.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.styles.src, styles)
    gulp.watch('./*.html').on('change', server.reload);
}


// Sass Task
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

// JS Task
function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(server.stream());
}

const dev = gulp.series(scripts, styles, serve);
export default dev;