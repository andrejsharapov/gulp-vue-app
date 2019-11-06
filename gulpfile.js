const gulp = require('gulp');
const sass = require('gulp-sass');
const
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    mmq = require('gulp-merge-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    flatten = require('gulp-flatten');

gulp.task('pug', function buildHTML() {
    return gulp.src('build/pug/pages/*')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('.'))
});

gulp.task('main', () => {
    return gulp.src(['reset.css', 'main.css'].map(file => `build/css/${file}`))
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        .pipe(mmq({
            log: true
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'))
});

gulp.task('js', () => {
    return gulp.src('build/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('js'))
});

gulp.task('jspages', () => {
    return gulp.src('build/js/pages/*')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('js'))
});

// simple conversion of the SASS format. Instead "sisass". Conversions, grouping and watching

gulp.task('sass', () => {
    return gulp.src('build/**/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(rename({suffix: ".min"}))
        .pipe(mmq({log: true}))
        .pipe(cleanCSS())
        .pipe(flatten())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'))
});

gulp.task('convert', () => {
    gulp.watch('build/pug/pages/*', gulp.series('pug'))
    gulp.watch('build/css/*.css', gulp.series('main'))
    gulp.watch('build/js/app.js', gulp.series('js'))
    gulp.watch('build/js/pages/*', gulp.series('jspages'))
    gulp.watch('build/**/**/*.sass', gulp.series('sass'))
});

gulp.task('wtch', gulp.series(gulp.parallel('pug', 'main', 'js', 'jspages', 'sass'), 'convert'));

const cache = require('gulp-cache');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminOptipng = require('imagemin-optipng'),
    imageminSvgo = require('imagemin-svgo'),
    imageminWebp = require('imagemin-webp');

let img_bf_min = 'build/src/**/*',
    img_af_min = 'src/';

gulp.task('imgmin', () => {
    return gulp.src(img_bf_min)
        .pipe(newer(img_bf_min))
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
        .pipe(gulp.dest(img_af_min))
});