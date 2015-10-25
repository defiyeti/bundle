var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var htmlify = require('gulp-angular-htmlify');
var sh = require('shelljs');
var lib = require('bower-files')();

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./scripts/**/*.js'],
  jade: ['./jade/index.jade'],
  vendor: ['./bower.json']
};

gulp.task('default', ['vendor', 'sass', 'scripts', 'views', 'watch']);

// JS APP
gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    return gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({preserveComments:'some'}))
        .pipe(gulp.dest('./www/js/'))
        ;
});

gulp.task('vendor', function() {
    return gulp.src(lib.ext('js').match('!**/*.min.js').files)
        .pipe(concat('base.js'))
        .pipe( uglify() )
        .pipe(gulp.dest('./www/js/'))
        ;
});

gulp.task('views', function () {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(htmlify())
    .pipe(gulp.dest('./www/'))
});

gulp.task('sass', function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.jade, ['views']);
  gulp.watch(paths.vendor, ['vendor']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
