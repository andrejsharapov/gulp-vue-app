const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

const sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mmq = require('gulp-merge-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    flatten = require('gulp-flatten');

const
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

const cache = require('gulp-cache');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminOptipng = require('imagemin-optipng'),
    imageminSvgo = require('imagemin-svgo'),
    imageminWebp = require('imagemin-webp');

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 8081,
        open: true,
        notify: false
    });
});

const reload = browserSync.reload;

const paths = {
    html: 'build/pug/pages/*',
    css: 'build/sass/*.*',
    js: 'build/js/app.js',
    jspage: 'build/js/pages/*',
    csspage: 'build/sass/pages/*',
    img_bf_min: 'build/src/**/*',
    img_af_min: 'src/'
}

gulp.task('pug', () => {
    return gulp.src(paths.html)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css', () => {
    return gulp.src(paths.css)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(concat('style.css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS())
        .pipe(flatten())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js', () => {
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
        .pipe(gulp.dest('js'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('jspage', () => {
    return gulp.src(paths.jspage)
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
        .pipe(gulp.dest('js'))
        .pipe(reload({
            stream: true
        }));
});

// simple conversion of the SASS format. Instead "sisass". Conversions, grouping and watching

gulp.task('csspage', () => {
    return gulp.src(paths.csspage)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS())
        .pipe(flatten())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watching', () => {
    gulp.watch(paths.html, gulp.parallel('pug'))
    gulp.watch(paths.css, gulp.parallel('css'))
    gulp.watch(paths.js, gulp.parallel('js'))
    gulp.watch(paths.jspage, gulp.parallel('jspage'))
    gulp.watch(paths.csspage, gulp.parallel('csspage'));
});

gulp.task('build', gulp.parallel('pug', 'css', 'js', 'jspage', 'csspage', 'serve', 'watching'));

gulp.task('imgmin', () => {
    return gulp.src(paths.img_bf_min)
        .pipe(newer(paths.img_bf_min))
        .pipe(cache(imagemin([
            imageminOptipng({
                optimizationLevel: 5
            }),
            imageminMozjpeg({
                progressive: true
            }),
            imageminSvgo({
                plugins: [{
                    removeViewBox: false
                }, ]
            }),
            imageminWebp({
                quality: 50
            })
        ], {
            verbose: true
        })))
        .pipe(gulp.dest(paths.img_af_min))
});