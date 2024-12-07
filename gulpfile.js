// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значение в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}
// Импорт задач
import { copy } from "./gulp/task/copy.js";
import { reset } from "./gulp/task/reset.js";
import { html } from "./gulp/task/html.js";
import { server } from "./gulp/task/server.js";
import { scss } from "./gulp/task/scss.js";
import { jsTask } from "./gulp/task/js.js";
import { images } from "./gulp/task/images.js";
import { otfToTtf, fontsStyle } from "./gulp/task/fonts.js";
// import { svgSprive } from "./gulp/task/svg.js";
// import { svgSpriveBuild } from "./gulp/task/svgBuild.js";
import { zip } from "./gulp/task/zip.js";
import { ftp } from "./gulp/task/ftp.js";
import { fontsCopy } from "./gulp/task/fontsCopy.js"; // Новый импорт
import { libsCopy } from "./gulp/task/libsCopy.js"; // Новый импорт

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, jsTask);
    gulp.watch(path.watch.images, images);
    gulp.watch(`${path.srcFolder}/fonts/**/*.*`, fontsCopy); // Следим за изменениями в папке fonts
    gulp.watch(`${path.srcFolder}/libs/**/*.*`, libsCopy); // Следим за изменениями в папке libs
}

//export { svgSprive }

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, fontsStyle);

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, jsTask, images, fontsCopy, libsCopy)); // Обновлено: добавлены задачи fontsCopy и libsCopy

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks,  zip);
const deployFTP = gulp.series(reset, mainTasks,  ftp);

// Экспорт сценариев
export { dev }
export { build }
export { deployZip }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
