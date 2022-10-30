//  Gulp
const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')

// HTML・Pug
const pug = require('gulp-pug')

// CSS・Sass
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const mmq = require('gulp-merge-media-queries')
const cleanCSS = require('gulp-clean-css')
const flatten = require('gulp-flatten')

// JavaScript
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")

//
const cache = require('gulp-cache')
const newer = require('gulp-newer')

// Images
const imagemin = require('gulp-imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')
const imageminWebp = require('imagemin-webp')

const baseDir = './tests/'

function serve() {
    browserSync.init({
        server: {
            baseDir: baseDir
        },
        port: 8081,
        open: true,
        notify: false
    });
}

const reload = browserSync.reload

const paths = {
    dest: baseDir,

    // Build app
    html: 'src/pug/pages/*',
    css: 'src/sass/*.*',
    js: 'src/js/app.js',

    // Bundles to pages
    js_page: 'src/js/pages/*',
    css_page: 'src/sass/pages/*',

    // Press images
    img_bf_min: 'src/static/img/**/*',
    img_af_min: `${baseDir}/static/img/`,
}

htmlBuild = () => {
    return gulp.src(paths.html)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(`${paths.dest}`))
        .pipe(reload({
            stream: true
        }));
};

compileSass = () => {
    return gulp.src(paths.css)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS())
        .pipe(flatten())
        .pipe(sourcemaps.write(`../maps`))
        .pipe(gulp.dest(`${paths.dest}/css`))
        .pipe(reload({
            stream: true
        }));
}

bundleAppJs = () => {
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(`${paths.dest}/js`))
        .pipe(reload({
            stream: true
        }));
}

bundleJsToPage = () => {
    return gulp.src(paths.js_page)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(`${paths.dest}/js`))
        .pipe(reload({
            stream: true
        }));
}

compileSassToPage = () => {
    return gulp.src(paths.css_page)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS())
        .pipe(flatten())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(`${paths.dest}/css`))
        .pipe(reload({
            stream: true
        }));
}

watching = () => {
    gulp.watch(paths.html, gulp.parallel('pug'))
    gulp.watch(paths.css, gulp.parallel('sass'))
    gulp.watch(paths.js, gulp.parallel('js'))
    gulp.watch(paths.js_page, gulp.parallel('jsToPage'))
    gulp.watch(paths.css_page, gulp.parallel('cssToPage'));
}

optimizeImages = () => {
    return gulp.src(paths.img_bf_min)
        .pipe(newer(paths.img_bf_min))
        .pipe(cache(imagemin([
            imageminOptipng({
                optimizationLevel: 7
            }),
            imageminMozjpeg({
                progressive: true
            }),
            imageminSvgo({
                plugins: [{
                    removeViewBox: false
                },]
            }),
            imageminWebp({
                quality: 45
            })
        ], {
            verbose: true
        })))
        .pipe(gulp.dest(paths.img_af_min))
};

exports.serve = serve
exports.pug = htmlBuild
exports.sass = compileSass
exports.js = bundleAppJs
exports.jsToPage = bundleJsToPage
exports.cssToPage = compileSassToPage
exports.watching = watching
exports.optimizeImages = optimizeImages