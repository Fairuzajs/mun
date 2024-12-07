// получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './build';
const srcFolder = './src';

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        libs: `${buildFolder}/libs/`, // Добавлено
        files: `${buildFolder}/files/`
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,wepb,svg}`,
        svg: `${srcFolder}/img/**/*.svg`,
        css: `${srcFolder}/css/`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/pug/pages/**/*.pug`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/img/svgicons/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        libs: `${srcFolder}/libs/**/*.*` // Добавлено
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/pug/**/*.pug`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,wepb,svg}`,
        files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        libs: `${srcFolder}/libs/**/*.*` // Добавлено
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'project'
};
