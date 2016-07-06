var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    jsSources = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/lodash/lodash.min.js',
        'node_modules/director/build/director.min.js',
        'app/controllers/*.js',
        'app/model.js',
        'app/index.js',
        'app/*.js'
    ],
    filesToCopy = [
        'app/index.html',
        'app/stylesheet.css'
    ];


gulp.task('scripts', function () {
    return gulp.src(jsSources)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function(){
    return gulp.src(filesToCopy)
        .pipe(gulp.dest('dist'));
});
gulp.task('copy:images', function(){
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'));
});


gulp.task('default', ['scripts','copy:images','copy']);