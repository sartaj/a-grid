var gulp = require('gulp');
var browserify = require('gulp-browserify');
var bump = require('gulp-bump');

gulp.task('build', ['scripts'])

gulp.task('release', ['scripts', 'bump']);

// Basic usage 
gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('src/eg-grid.js')
        .pipe(browserify({
          insertGlobals : false,
          // debug : true
        }))
        .pipe(gulp.dest('./dist'));
});


// https://www.npmjs.com/package/gulp-bump
gulp.task('bump', function(){
  gulp.src('./*.json')
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});