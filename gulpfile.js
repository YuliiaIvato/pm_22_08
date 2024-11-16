const gulp = require("gulp");
const {src, dest, series, parallel, watch} = require('gulp');
const file_include = require('gulp-file-include')
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const html_task = () => src('app/*.html')
    .pipe(file_include({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());

const js_task = () => src('app/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());

const scss_task = () => {
    return src('app/scss/*.scss') // Вибір файлів SCSS
        .pipe(sass().on('error', sass.logError)) // Компіляція SCSS у CSS
        .pipe(postcss([autoprefixer()])) // Додавання префіксів
        .pipe(cssnano()) // Мінімізація CSS
        .pipe(rename({suffix: '.min'})) // Додавання суфікса .min до файлу
        .pipe(dest('dist/css')) // Збереження результату
        .pipe(browserSync.stream());
};

const img_task = () => src('app/img/*.+(jpg|jpeg|png|gif)', {encoding: false})
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
    }))
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());

const copy_json = () => src('app/data/*.json') // Вибирає всі JSON файли у /data
    .pipe(dest('dist/data')) // Копіює їх у dist/data
    .pipe(browserSync.stream()); // Оновлює сторінку

const browserSync_task = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
};

const watch_task = () => {
    browserSync_task();
    watch('app/*.html', parallel(html_task));
    watch('app/scss/*.scss', parallel(scss_task));
    watch('app/js/*.js', parallel(js_task));
    watch('app/img/*.+(jpg|jpeg|png|gif)', img_task);
    watch('app/data/*.json', series(copy_json)); // Слідкування за змінами в JSON-файлах
};

exports.default = series(html_task,copy_json, img_task, scss_task, watch_task, js_task);