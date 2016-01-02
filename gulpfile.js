var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');

gulp.task('clean', function(cb) {
  del(['anaclock.xpi'], cb);
});

gulp.task('all', function() {
  gulp.src(['anaclock.html', 'manifest.json', 'options.html', 'lib/**'], { base: './' })
    .pipe(zip('anaclock.xpi'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'all']);
