//var gulp = require('gulp'),
//  less = require('gulp-less');
// 
//gulp.task('testLess', function () {
//  //编译src目录下的所有less文件
//  //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
//  gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less']) 
//      .pipe(less())
//      .pipe(gulp.dest('src/css'));
//});



//https://www.npmjs.com/package/gulp-rev-format    这个地址后面的方法名改一下就都有了
var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),//压缩css
    rename = require('gulp-rename'),//重命名
    rev = require('gulp-rev'),//md5签名添加
    clean = require('gulp-clean'),//清除
    revFormat = require('gulp-rev-format'),//针对有md5签名的文件名的重命名
    revReplace = require('gulp-rev-replace'),//针对添加md5签名后的html文件中文件名的替换
    uglify = require('gulp-uglify'),//压缩js
    imagemin = require('gulp-imagemin'),//压缩image
    sequence = require('gulp-sequence');//规定事件执行顺序
 
gulp.task('testLess', function () {
    gulp.src(['src/less/*.less','!src/less/{reset,common}.less'])
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});
 
gulp.task('testWatch', function () {
    gulp.watch('src/**/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});




gulp.task('testClean',function(){//清除dist文件夹
	gulp.src('dist',{read :false})
		.pipe(clean());
});

gulp.task('testDist',function(){//css、js、图片文件压缩，css、js添加md5签名
	gulp.src(['src/css/*.css'])
		.pipe(minifyCss())
		.pipe(rev())
		.pipe(revFormat({
			suffix: '.min',
			lastExt: false
		}))
		.pipe(gulp.dest('dist/css1'))
		.pipe(rev.manifest() )
		.pipe(gulp.dest('dist/css1'));
	gulp.src(['src/js/*.js'])
		.pipe(uglify())
		.pipe(rev())
		.pipe(revFormat({
			suffix: '.min',
			lastExt: false
		}))
		.pipe(gulp.dest('dist/js1'))
		.pipe(rev.manifest() )
		.pipe(gulp.dest('dist/js1'));
	gulp.src(['src/img/*.*'])
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
	gulp.src(['src/css/*.css'])
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'));
	gulp.src(['src/js/*.js'])
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('changeV',function(){//html中文件名的批量修改
	var manifest=gulp.src(['dist/*/*.json']);
	function modifyUnreved(filename){
		return filename;
	}
	function modifyReved(filename){
		if(filename.indexOf('.min')>-1){
			const _version= filename.match(/\-[\w]*\.min/)[0].replace(/(\-|.min)*/g,'');
			const _filename= filename.replace(/\-[\w]*/,'');
			filename =_filename + "?major=" + _version;
			return filename;
		}
		return filename;
	}		
		
	gulp.src(['src/*.html'])
		.pipe(revReplace({
			manifest: manifest,
			modifyUnreved: modifyUnreved,
			modifyReved: modifyReved
		}))
		.pipe(gulp.dest('dist'));
	
	gulp.src(['dist/css1','dist/js1'],{read :false})
		.pipe(clean());
	
});


//gulp.task('def', function(cb) {  //有问题！
//  sequence('testClean' , 'testDist' , 'changeV' , cb);
//});


//gulp.task('testChange',function(){
//	gulp.src(['dist/*/*.json','src/*.html'])
//		.pipe(revCollector())
//		.pipe(gulp.dest('dist'));
//});


//gulp.task('testCss',function(){
//	gulp.src(['src/css/*.css'])
//		.pipe(minifyCss())
//		.pipe(gulp.dest('dist/css'));
//	gulp.src(['dist/*.html'])
//		.pipe(revAppend())
//		.pipe(gulp.dest('dist/change'));
//})


