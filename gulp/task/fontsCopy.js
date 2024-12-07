export const fontsCopy = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.*`)
        .pipe(app.gulp.dest(`${app.path.buildFolder}/fonts`));
};
