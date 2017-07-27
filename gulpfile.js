/**
 * gulp配置文件
 * */
var path = require('path');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var livereload = require('gulp-livereload')

var config = require(path.join(__dirname, './src/config')).path(path.join(__dirname, './config/config_app'));
var theme = path.join('./themes', config.getItem('theme'), 'static');
var themePath = path.join(theme, 'dict');

var srcOpts = {
    base: __dirname,
    buffer: true
};

// 默认任务
gulp.task('default', ['mini']);


// 压缩js/css任务
gulp.task('mini', function () {
    console.log('mini task.');
    // 压缩js
    gulp.src([theme + '/js/*.js', '!' + theme + '/js/*.min.js'], srcOpts)
        .pipe(uglify())
        .pipe(gulp.dest(themePath + '/js/'));

    // 压缩css
    gulp.src([theme + '/css/*.css', '!' + theme + '/css/*.min.css'])
        .pipe(minify())
        .pipe(gulp.dest(themePath + '/css/')).pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();

    // 监听目录下的文件，若文件发生变化，则调用mini任务。
    gulp.watch(
        [
            theme + '/js/*.js',
            '!' + theme + '/js/*.min.js',
            theme + '/css/*.css',
            '!' + theme + '/css/*.min.css'
        ]
        , ['mini']
    );
});

