var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var p = require('partialify')


gulp.task('main',function () {
    gulp.src('./dev/frontend/Templates/Main/main.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('tables',function () {
    gulp.src('./dev/frontend/Templates/Tables/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./dev/frontend/utils/Templates'))
})



gulp.task('tables',function () {
    gulp.src('./dev/frontend/Templates/Documentos/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./dev/frontend/utils/Templates'))
})


gulp.task('modals',function () {
    gulp.src('./dev/frontend/Templates/Modals/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./dev/frontend/utils/Templates'))
})



gulp.task('forms',function () {
    gulp.src('./dev/frontend/Templates/Forms/*.pug')
    .pipe(pug({
        pretty:true
    }))
    .pipe(gulp.dest('./dev/frontend/utils/Templates'))
})

gulp.task('css',function(){
    gulp.src('./dev/frontend/assets/css/main.styl')
    .pipe(stylus(
        {'include css':true}
    ))
    .pipe(gulp.dest('./assets/Css/'))
})

gulp.task('js',function(){
    return browserify('./dev/frontend/index.js')
    .transform('babelify',{presets:['es2015']})
    .transform(p)
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./assets/js/'))
})

gulp.task('menu',function(){
    return browserify('./dev/frontend/utils/Menu/index.js')
    .transform('babelify',{presets:['es2015']})
    .bundle()
    .pipe(source('menu.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./assets/js/'))
})




gulp.task('vistaRender',['html','css'])
gulp.task('pugRender',['main','tables','forms','modals'])