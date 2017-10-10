var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')

gulp.task('templates',function () {
    gulp.src('./sources/templates/main/main.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./View/templates/'))
})

gulp.task('css',function(){
    gulp.src('./sources/css/main.styl')
    .pipe(stylus(
        {'include css':true}
    ))
    .pipe(gulp.dest('./View/css/'))
})

gulp.task('vistaRender',['templates','css'])