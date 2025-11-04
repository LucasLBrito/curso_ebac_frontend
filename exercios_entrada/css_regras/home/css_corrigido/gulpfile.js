const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Define a função para compilar o SASS
function compilaSass() {
    return src('./main-bem.scss') // Fonte do arquivo SASS
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Compila e comprime o CSS
        .pipe(dest('./')); // Destino do arquivo CSS compilado (mesmo diretório)
}

// Define a função watch para monitorar alterações
function watchFiles() {
    watch('./main-bem.scss', compilaSass);
}

// Exporta as tarefas
exports.sass = compilaSass;
exports.watch = watchFiles;
exports.default = series(compilaSass, watchFiles);
