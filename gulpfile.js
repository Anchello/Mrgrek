'use strict';

const gulp = require('gulp');  // Task runner
const less = require('gulp-less'); // Compile Less to CSS
const rename = require('gulp-rename'); // Rename some files
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // Prefix CSS
const mqpacker = require('css-mqpacker');
const cleanss = require('gulp-cleancss');
const sourcemaps = require('gulp-sourcemaps'); // Write source maps
const concat = require('gulp-concat'); // Concat JS
const uglify = require('gulp-uglify'); // Minify JS
const browserSync = require('browser-sync').create(); // Synchronised browser testing
const ghPages = require('gulp-gh-pages'); // Publish contents to Github pages

// Компиляция LESS
gulp.task('less', function () {
  return gulp.src('./src/less/style.less')
    // .pipe(plumberNotifier())
    .pipe(less())
    .pipe(postcss([
        autoprefixer({browsers: ['last 2 version']}),
        mqpacker
    ]))
    .pipe(gulp.dest('./src/css'))
    .pipe(cleanss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./src/css'));
    // .pipe(browserSync.stream());
});

// Конкатенация Javascript custom
gulp.task('js', function() {
  return gulp.src('./src/js/custom/*.js')
      .pipe(concat('custom.min.js'))
      .pipe(gulp.dest('./src/js/'));
});

// Конкатенация Javascript vendor
gulp.task('js-vendor', function() {
  return gulp.src('./src/js/vendor/*.js')
      .pipe(concat('vendor.min.js'))
      .pipe(gulp.dest('./src/js/'));
});

// Сборка всего
gulp.task('build', function(){
  gulp.src('./src/css/vendor/*.css')
    .pipe(cleanss())
    .pipe(gulp.dest('./build/css/vendor'));
  gulp.src('./src/css/*.css')
      .pipe(gulp.dest('./build/css/'));
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'));
  gulp.src('./src/fonts/**/*.*')
      .pipe(gulp.dest('./build/fonts'));
  gulp.src('./src/icons/**/*.*')
    .pipe(gulp.dest('./build/icons'));
  gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./build/img'));
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/svg/*.*')
    .pipe(gulp.dest('./build/svg'));
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// запуск browserSync + компилятора less
gulp.task('serve', ['less'], function(){
  browserSync.init({
    server: "./src"
    });

  // Слежение, выполняем задачу less
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/js/custom/*.js', ['js']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});