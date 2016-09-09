'use strict';

const gulp = require('gulp');  // Task runner
const less = require('gulp-less'); // Compile Less to CSS
// const plumberNotifier = require('gulp-plumber-notifier');
const rename = require('gulp-rename'); // Rename some files
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // Prefix CSS
const mqpacker = require('css-mqpacker');
const cleanss = require('gulp-cleancss');
const sourcemaps = require('gulp-sourcemaps'); // Write source maps
// const htmlhint = require('gulp-htmlhint');
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
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./src/css'));
    // .pipe(browserSync.stream());
});

// Сборка всего
gulp.task('build', function(){
  gulp.src('./src/css/*.css')
    .pipe(cleanss())
    // .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build/'));
  gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./build/img'));
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/svg/*.svg')
    .pipe(gulp.dest('./build/svg'));
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Очистка папки сборки
gulp.task('clear', function() {
  return gulp.src('build/**')
    .pipe(clean({force:true}));
});

// запуск browserSync + компилятора less
gulp.task('serve', ['less'], function(){
  browserSync.init({
    server: "./src"
    });

  // Слежение, выполняем задачу less
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});