const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');


function compileSass() {
  return gulp.src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/style'));
}
function minifyJs() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', function (err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'));
}
function compressImages() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}
// Tarefa para injetar o CSS no HTML
function injetaHTML() {
    // Pega os arquivos CSS e JS que serão injetados
    const sources = gulp.src(['dist/style/*.css', 'dist/scripts/*.js'], { read: false });

    // Pega o arquivo HTML principal
    return gulp.src('src/index.html')
        .pipe(inject(sources, { relative: true })) // Injeta os arquivos com caminho relativo
        .pipe(gulp.dest('dist')); // Salva o novo index.html na pasta de destino
}


exports.compileSass = compileSass;
exports.miniJs = minifyJs;
exports.compressImages = compressImages;
exports.HTML = injetaHTML;
exports.default = gulp.series(
    compileSass,
    minifyJs,
    compressImages,
    injetaHTML);