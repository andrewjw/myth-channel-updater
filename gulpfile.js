var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

gulp.task('default', ['lint', 'build']);

gulp.task('build', ['build-server', 'build-frontend', 'build-mock']);

function builder(build_type, out_file, out_dir) {
    var opts = {
        noImplicitAny: true,
    };

    if (out_file) {
        opts.module = 'amd';
        opts.outFile = build_type + '.js';
    }

    return function () {
        return gulp.src('src/' + build_type + '/*.ts')
            .pipe(ts(opts))
            .pipe(gulp.dest('out/' + out_dir));
    }
}

gulp.task('build-server', builder('server', false, 'main'));

gulp.task('build-frontend', builder('frontend', true, 'main/static'));

gulp.task('build-mock', builder('mock', false, 'mock'));

gulp.task('lint', function () {
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});
