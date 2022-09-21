import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import {deleteAsync} from 'del'
import postcss from 'gulp-postcss';
import cssMinify from "postcss-csso";
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from "gulp-libsquoosh";

// Svg sprite

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/'))
}

// Svg copy

const svg = () => {
  return gulp.src(['source/img/*.svg', "!source/img/icons/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest('build/img/'))
}


// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      cssMinify()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// Html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest("build/js/"));
}

// Images

const optimazeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("source/img/"));
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(gulp.dest("build/img/"));
}

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest("build/img/"));
}

// Copy

const copyFiles = (done) => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico",
    "source/*.webmanifest",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Clean
const clean = () => {
  return deleteAsync("build")
}



// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}



export const build = gulp.series(
  clean,
  optimazeImages,
  copyImages,
  copyFiles,
  createWebp,
  gulp.parallel(
    html,
    styles,
    sprite,
    svg,
    scripts
  )
);

export default gulp.series(
  clean,
  // optimazeImages,
  copyImages,
  copyFiles,
  createWebp,
  gulp.parallel(
    html,
    styles,
    sprite,
    svg,
    scripts
  ),
  server,
  watcher
);
