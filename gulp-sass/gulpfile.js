'use strict';
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path'),
    merge = require('merge-stream');



/*一个项目  start*/
gulp.task('sass-one', function() {
    return gulp.src('./styles/sass/*.scss').pipe(sass({
        //输出方式 nested, expanded, compact, compressed
        outputStyle: 'expanded'
    }).on('error', sass.logError)).pipe(autoprefixer({
        //浏览器设置
        browsers: ['>1%', 'last 3 versions', 'Android >= 4.4', 'iOS 8'],
        //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);       
        cascade: true,
    })).pipe(gulp.dest('./styles/css'));
});
gulp.task('sass-one:watch', function() {
    gulp.watch('./styles/sass/*.scss', ['sass-one']);
});
/*一个项目  end*/



/*多个项目 start*/
var folders = ['dossen-comment-web', 'dossen-order-web'];
gulp.task('sass-multi', function() {
    var tasks = folders.map(function(element) {
        return gulp.src(element + '/src/main/webapp/styles/sass/*.scss', {
            base: element + '/src/main/webapp/styles/sass'
        }).pipe(sass({
            //输出方式 nested, expanded, compact, compressed
            outputStyle: 'expanded'
        }).on('error', sass.logError)).pipe(autoprefixer({
            //浏览器设置
            browsers: ['>1%', 'last 3 versions', 'Android >= 4.4', 'iOS 8'],
            //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);       
            cascade: true,
        })).pipe(gulp.dest(element + '/src/main/webapp/styles/css'));
    });
    return merge(tasks);
});
gulp.task('sass-multi:watch', function() {
    folders.map(function(element) {
        gulp.watch(element + '/src/main/webapp/styles/sass/*.scss', ['sass-multi']);
    });
});
/*多个项目 end*/



/*多个项目styles下多个样式文件夹 start*/
var m_folders = [
'dossen-comment-web/src/main/webapp/styles',
'dossen-comment-web/src/main/webapp/styles/comment',
'dossen-comment-web/src/main/webapp/styles/fundation'];

gulp.task('sass-multi-multi', function() {
    var tasks = m_folders.map(function(element) {
        return gulp.src(element + '/sass/*.scss', {
            base: element + '/sass'
        }).pipe(sass({
            //输出方式 nested, expanded, compact, compressed
            outputStyle: 'expanded'
        }).on('error', sass.logError)).pipe(autoprefixer({
            //浏览器设置
            browsers: ['>1%', 'last 3 versions', 'Android >= 4.4', 'iOS 8'],
            //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);       
            cascade: true,
        })).pipe(gulp.dest(element + '/css'));
    });
    return merge(tasks);
});
gulp.task('sass-multi-multi:watch', function() {
    m_folders.map(function(element) {
        gulp.watch(element + '/sass/*.scss', ['sass-multi-multi']);
    });
});
/*多个项目styles下多个样式文件夹 end*/