var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jsSources = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/lodash/lodash.min.js',
        'node_modules/director/build/director.min.js',
        'app/controllers/*.js',
        'app/*.js'
    ],
    filesToCopy = [
        'app/index.html',
        'app/stylesheet.css'
    ];
//todo minify, cleardist, watch files

gulp.task('scripts:concat', function () {
    return gulp.src(jsSources)
        .pipe(concat('all.js'))
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


gulp.task('default', ['scripts:concat','copy:images','copy']);