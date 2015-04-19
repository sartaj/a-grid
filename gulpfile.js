// Packages

  // Core 
  
  var gulp = require('gulp');

  // Transforms

  var browserify = require('gulp-browserify'),
      uglify = require('gulp-uglify'),
      minifyHTML = require('gulp-minify-html'),
      minifyCSS = require('gulp-minify-css'),
      vulcanize = require('gulp-vulcanize'),
      concat = require('gulp-concat');

  // Release
  
  var git = require('gulp-git'),
      bump = require('gulp-bump'),
      filter = require('gulp-filter'),
      tag_version = require('gulp-tag-version');

// Tasks

  gulp.task('build', function() { return build()});

  var releaseTasks = ['build'];
  gulp.task('patch', releaseTasks, function() { return release('patch'); });
  gulp.task('minor', releaseTasks, function() { return release('minor'); });
  gulp.task('major', releaseTasks, function() { return release('major'); });

// Scripts

  function build() {

    // Single entry point to browserify 
    gulp.src('src/**/*.js')
      .pipe(browserify())
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));

    gulp.src('src/**/*.html')
      .pipe(minifyHTML())
      .pipe(gulp.dest('./dist'));

    gulp.src('src/**/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist'));

    // gulp.src('./dist/eg-structure.html')
    //   .pipe(vulcanize({
    //       inlineScripts: true
    //   }))
    //   // .pipe(concat('eg-structure.html'))
    //   .pipe(gulp.dest('./dist'));

  }

// Release

  function release(importance) {

    // get all the files to bump version in 
    return gulp.src(['./*.json'])

      // bump the version number in those files 
      .pipe(bump({type: importance}))

      // save it back to filesystem 
      .pipe(gulp.dest('./'))

      // commit the changed version number 
      .pipe(git.commit('update version'))

      // read only one file to get the version number 
      .pipe(filter('package.json'))
      // **tag it in the repository** 
      .pipe(tag_version());

  }