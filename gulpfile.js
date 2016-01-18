var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    stripDebug  = require('gulp-strip-debug'),
    connect     = require('connect'),
    serveStatic = require('serve-static');

var css = {
    src: [
        './bower_components/normalize.css/normalize.css',
        './src/css/**/*.css'
    ]
};

var config = {
    src: [
        './src/core/**/*.js',
        './src/js/**/*.js'
    ],
    libs: [
        './bower_components/threejs/build/three.js',
        './bower_components/obj-loader/index.js',
        './bower_components/trackball-controls/index.js',
        './bower_components/dat.gui/dat.gui.js',
        './bower_components/jquery/dist/jquery.js',
        ''
    ]
};

gulp.task('jshint', function() {
    gulp.src(config.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    ;
});

gulp.task('css', function() {
    gulp.src(css.src)
        .pipe(concat('shop.css'))
        .pipe(gulp.dest('./web/css/'))
    ;
});

gulp.task('concat', function() {
    gulp.src(config.libs.concat(config.src))
        .pipe(concat('shop.js'))
        .pipe(gulp.dest('./web/js/'))
    ;
});

gulp.task('uglify', function() {
    gulp.src('./web/js/shop.js')
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./web/js/'))
    ;
});

gulp.task('watch', function() {
    gulp.watch(config.src, ['src']);
});

gulp.task('serve', function () {
    var app = connect();
        app.use(serveStatic('web'));
        app.listen(3000);
});

gulp.task('default', ['jshint', 'concat', 'css'], function() {});
