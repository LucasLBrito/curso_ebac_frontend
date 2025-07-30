const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


function compileSass() {
  return gulp.src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
}
function minifyJs() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', function (err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
}
function compressImages() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}
function copiHtml() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
}


exports.compileSass = compileSass;
exports.miniJs = minifyJs;
exports.compressImages = compressImages;
exports.copiHtml = copiHtml;