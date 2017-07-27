/**
 * gulp配置文件
 * */
var path = require('path');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

var config = require(path.join(__dirname, './src/config')).path(path.join(__dirname, './config/config_app'));
var theme = path.join('./themes', config.getItem('theme'), 'static');
var themePath = path.join(theme, 'dict');
// 默认任务
gulp.task('default', ['mini']);


var a = gulp.src([theme + '/js/*.js', '!' + theme + '/js/*.min.js']);
console.log(themePath + '/js/');
// 压缩js/css任务
gulp.task('mini', function () {

    // 压缩js
    gulp.src([theme + '/js/*.js', '!' + theme + '/js/*.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest(themePath + '/js/'));

    // 压缩css
    gulp.src([theme + '/css/*.css', '!' + theme + '/css/*.min.css'])
        .pipe(minify())
        .pipe(gulp.dest(themePath + '/css/'));
});

