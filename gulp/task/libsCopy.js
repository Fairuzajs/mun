export const libsCopy = () => {
    return app.gulp.src(`${app.path.srcFolder}/libs/**/*.*`)
        .pipe(app.gulp.dest(`${app.path.buildFolder}/libs`));
};