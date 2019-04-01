"use strict";

import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import inject from "gulp-inject";
import browserSync from "browser-sync";
const server = browserSync.create();

const paths = {
  scripts: {
    src: "src/*/*/*.js",
    dest: "dist"
  },
  styles: {
    src: "src/*/*/*.scss",
    dest: "dist"
  },
  htmlInject: {
    stylesSrc: "./dist/**/*.css",
    scriptsSrc: "./dist/**/*.js"
  }
};

// Browsersync
function serve() {
  server.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.styles.src, styles);
  gulp.watch("./*.html").on("change", server.reload);
}

// Sass Task
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
}

// Html Injection
function html() {
  let target = gulp.src("./index.html");
  let sources = gulp.src(
    [paths.htmlInject.scriptsSrc, paths.htmlInject.stylesSrc],
    {
      read: false
    }
  );
  return target
    .pipe(inject(sources))
    .pipe(gulp.dest("./src")
    .pipe(server.stream()));
}

// JS Task
function scripts() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(server.stream());
}

const dev = gulp.series(scripts, styles, html, serve);
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.serve = serve;
export default dev;
