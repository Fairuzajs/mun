import webpack from "webpack-stream";
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";

export const js = () => {
    return gulp.src(app.path.src.js, { sourcemaps: app.isDev }) // Обрабатываем все файлы JS
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(gulp.dest(app.path.build.js, { sourcemaps: app.isDev }))
        .pipe(browsersync.stream());
};

// Функция для перемещения всех остальных JS файлов без Webpack
export const moveJs = () => {
    return gulp.src([`${app.path.srcFolder}/js/**/*.js`, `!${app.path.srcFolder}/js/app.js`]) // Исключаем app.js, который уже обработан Webpack
        .pipe(gulp.dest(app.path.build.js))
        .pipe(browsersync.stream());
};

// Основная задача, объединяющая обе задачи
export const jsTask = gulp.series(js, moveJs);
