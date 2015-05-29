// Requires

  // Core 
  
  var gulp = require('gulp');
  var clean = require('gulp-clean');

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

// Release Task

  var releaseTasks = ['build'];
  gulp.task('patch', releaseTasks, function() { return release('patch'); });
  gulp.task('minor', releaseTasks, function() { return release('minor'); });
  gulp.task('major', releaseTasks, function() { return release('major'); });

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

// Build Task

  gulp.task('build', ['clean','prepare-js','prepare-css','prepare-html'], function() {

    gulp.src('./.tmp/structure.html')
    .pipe(vulcanize({
        inlineScripts: true,
        inlineCss: true

    }))
    // .pipe(concat('structure.html'))
    .pipe(gulp.dest('./dist'));

  });

  // Preparation

    gulp.task('prepare-js', function() {

      return gulp.src('src/**/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp'));

    });

    gulp.task('prepare-css', function() {

      return gulp.src('src/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./.tmp'));

    });

    gulp.task('prepare-html', function() {

      return gulp.src('src/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./.tmp'));

    });

// Utilities

  gulp.task('clean', function() { return 
    
    return gulp.src('./.tmp')
      .pipe(clean())
    .pipe(gulp.src('./dist')
      .pipe(clean()));
  
  });

