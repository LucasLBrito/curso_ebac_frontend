const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');

// Tarefa para compilar o SASS
function compileSass() {
  return gulp.src('src/style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/style'));
}

// Tarefa para minificar o JavaScript
function minifyJs() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'));
}

// Tarefa para comprimir imagens
function compressImages() {
  // As imagens serão salvas em 'dist/img'
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

// ✔️ TAREFA ÚNICA E CORRIGIDA PARA INJETAR TUDO NO HTML
function buildHtml() {
  // Fontes de CSS e JS
  const sources = gulp.src(['dist/style/**/*.css', 'dist/scripts/**/*.js'], { read: false });
  // Fontes de Imagens (corrigido para 'dist/img')
  const imageSources = gulp.src('dist/img/**/*.+(png|jpg|jpeg|gif|svg)', { read: false });

  return gulp.src('src/index.html')
    // 1. Injeta CSS e JS
    .pipe(inject(sources, { relative: true }))
    // 2. Injeta as tags <img>
    .pipe(inject(imageSources, {
      relative: true,
      // Damos um nome para este inject para o placeholder no HTML
      name: 'images',
      // Transforma o caminho em uma tag <img>
      transform: function(filepath) {
        return `<img src="${filepath}" alt="">`;
      }
    }))
    .pipe(gulp.dest('dist'));
}

// Define a ordem correta de execução
exports.default = gulp.series(
  // Primeiro, processa todos os assets (CSS, JS, Imagens)
  gulp.parallel(compileSass, minifyJs, compressImages),
  // Por último, constrói o HTML com tudo já pronto na pasta 'dist'
  buildHtml
);

// Exports individuais para rodar tarefas separadamente
exports.sass = compileSass;
exports.js = minifyJs;
exports.images = compressImages;
exports.html = buildHtml;