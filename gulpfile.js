var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');

gulp.task('clean', function(cb) {
    del(['anaclock.xpi'], cb);
});

gulp.task('all', function() {
    gulp.src(['anaclock.html', 'anaclock.js',
              'options.html', 'options.js',
              'common.js', 'manifest.json',
              'lib/**', '!lib/**/Thumbs.db'], {
            base: './'
        })
        .pipe(zip('anaclock.xpi'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'all']);
