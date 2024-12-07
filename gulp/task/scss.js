import * as sass from 'sass';
import gulpSass from 'gulp-sass';


import cleanCss from 'gulp-clean-css'; //сжатие css файла

import autoprefixer from 'gulp-autoprefixer'; // Доавление вендорных префиксов
import gcmq from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sassCompiler = gulpSass(sass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'Scss',
                sound: false,
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sassCompiler({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if (
                app.isBuild,
                gcmq()
            )
        )
        .pipe(
            app.plugins.if (
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 version"],
                    cascade: true
                })
            )
        )
        // .pipe(
        //     app.plugins.if (
        //         app.isBuild,
        //         webpcss({
        //             webpClass: ".webp",
        //             noWebpClass: ".no-webp"
        //         })
        //     )
        // )
        .pipe(app.gulp.dest(app.path.src.css))
        .pipe(
            app.plugins.if (
                app.isBuild,
                cleanCss()
            )
        )
        // .pipe(rename({
        //     extname: ".min.css"
        // }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}