/**
 * Created by martina on 16/11/15.
 */
(function(){
    "use strict";
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        watch = require('gulp-watch'),
        livereload = require('gulp-livereload'),
        concat = require('gulp-concat'),
        del = require('del'),
        neat = require('node-neat').includePaths;

    var paths = {
        scss: 'public/src/scss/style.scss',
        index: 'public/src/index.html'
    };

    gulp.task('styles', function () {
        return gulp.src([
                (paths.scss),
            ('bower_components/font-awesome/css/font-awesome.min.css'),
            ('bower_components/angular-chart.js/dist/angular-chart.css'),
            ('public/src/scss/generator.css')
            ])
            .pipe(sass({
                includePaths: ['styles'].concat(neat)
            }))
            .pipe(concat('styles.min.css'))
            .pipe(gulp.dest('public/dist/css'));
    });

    gulp.task('index', function () {
        gulp.src('public/src/index.html')
            .pipe(gulp.dest( 'public/dist' ));
    });

    gulp.task('app', function () {
        gulp.src('public/src/app.js')
            .pipe(gulp.dest( 'public/dist' ));
    });

    gulp.task('scss', function(){
        gulp.start('styles');
    });

    gulp.task('fonts', function () {
        return gulp.src('public/src/fonts/**/*')
            .pipe(gulp.dest('public/dist/fonts'));
    });

    gulp.task('js', function(){
        gulp.src([('bower_components/angular/angular.min.js'),
            ('bower_components/restangular/dist/restangular.js'),
            ('bower_components/restangular/dist/restangular.min.js'),
            ('bower_components/Chart.js/Chart.js'),
            ('bower_components/angular-chart.js/dist/angular-chart.js'),
            ('bower_components/lodash/lodash.min.js'),
            ('public/src/js/main.js')])
            .pipe(concat('base.min.js'))
            .pipe(gulp.dest( 'public/dist/js' ));
    });

    gulp.task('watch', function() {
        gulp.watch(paths.scss, ['scss']);
        gulp.watch(paths.index, ['index']);
    });

})();