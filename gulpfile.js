const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
//const minifyImg = require('gulp-imagemin');
//const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
//const del = require('del');
const reload = browserSync.reload;
const runSequence = require('run-sequence').use(gulp);



var paths = {
    //scripts: ['./dev/assets/scripts/common.js'],
    appstyles: 'scss/app/**/*.scss',
    appdest: 'cms/public/udemy-v1/styles',
    adminstyles: 'scss/admin/*.scss',
    admindest: 'cms/admin/public/styles',
   // html: './dist/*.html',
};

gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'localhost/cms',
        //proxy: '127.0.0.1',
        //port: 3000,
        open: false,
        notify: true
    });
});

gulp.task('css', () => {
    return gulp.src(paths.appstyles)
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.appdest))
        .pipe(browserSync.stream());
});

gulp.task('admincss', () => {
    return gulp.src(paths.adminstyles)
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.admindest))
        .pipe(browserSync.stream());
        
});

gulp.task('watch', () => {
    gulp.watch("scss/app/**/*.scss", ['css']), reload;
    gulp.watch("scss/admin/**/*.scss", ['admincss']), reload;
    //gulp.watch("src/js/**/*.js", ['js']);
    //gulp.watch("src/img/**/*", ['img']);
    //gulp.watch("cms/**/*.html", ['html']);
    gulp.watch("cms/**/*.php", reload);
});

gulp.task('default', () => {
    runSequence(
        //'delete',
        //'html',
        'css',
        'admincss',
        //'js',
        //'img',
        //'browser-sync',
        'watch',
        'browser-sync'
    );
});