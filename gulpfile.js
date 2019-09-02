// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

// File path variables
const files = {
  sassPath: 'src/sass/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

// Sass task
const sassTask = () => {
  return src(files.sassPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist'));
};

// JS task
const jsTask = () => {
  return src(files.jsPath)
    .pipe(concat('scripts.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest('dist'));
};

// Watch task
const watchTask = () => {
  watch([files.sassPath, files.jsPath], parallel(sassTask, jsTask));
};

// Default task
exports.default = series(parallel(sassTask, jsTask), watchTask);
