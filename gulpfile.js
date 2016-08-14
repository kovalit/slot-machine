var gulp = require('gulp'), 
    sass = require('gulp-sass'), 
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    cssImageDimensions = require("gulp-css-image-dimensions"),
    mainBowerFiles = require('main-bower-files'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger');


gulp.task('sass', function(){ 
    return gulp.src('public/css/scss/**/*.scss') 
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(cssImageDimensions('../../img'))
        .pipe(gulp.dest('public/css/'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/')) 
});

gulp.task('watch', function(){
    watch(['public/css/**/*.scss'], function(event, cb) {
        gulp.start('sass');
    });
});

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles({ filter:'**/*.js'}))
        .pipe(gulp.dest('public/js/dist'))
});

gulp.task('js', function() {
    return gulp.src('public/js/dist/app.js')
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('default', ['sass', 'watch']);
