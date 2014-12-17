// requirements
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var path         = require('path');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var sass         = require('gulp-sass');
var livereload   = require('gulp-livereload');
var gutil        = require('gulp-util');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var pkg          = require('./package');
var stylish      = require('jshint-stylish');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');

var debug        = !!gutil.env.debug;
if (debug) {
  process.env.NODE_ENV = 'development';
}

gulp.task('default', ['style', 'scripts']);

gulp.task('style', function() {
  var processor = debug ? gutil.noop : minifyCss;

  gulp.src('./src/sass/theam.scss')
    .pipe(sass({
      sourceMap: 'sass',
      sourceComments: 'map',
      precision: 10,
      imagePath: 'images'
    }))
    .on('error', gutil.log)
    .pipe(rename('style.css'))
    .pipe(autoprefixer())
    .pipe(processor())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('jshint', function() {
  var jshintConfig = pkg.jshintConfig;

  return gulp
    .src([ 'src/**/*.js' ])
    .on('error', console.log.bind(console))
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish))
});

gulp.task('scripts', [ 'jshint' ], function() {
  var processor = debug ? gutil.noop : uglify;

  var bundler = browserify({
    entries: ['./src/js/application.js'],
    debug: debug
  });

  return bundler
    .bundle()
    .on('error', console.log.bind(console))
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(processor())
    .pipe(gulp.dest('./assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', [ 'style' ]).on('change', livereload.changed);
  gulp.watch('src/**/*.js', [ 'scripts' ]).on('change', livereload.changed);
});
