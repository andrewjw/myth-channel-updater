const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');

gulp.task('default', ['lint', 'build']);

gulp.task('build', ['build-backend', 'build-frontend', 'build-mock']);

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

gulp.task('build-backend', builder('backend', false, 'main'));

gulp.task('build-frontend', builder('frontend', true, 'main/static'));

gulp.task('build-mock', builder('mock', false, 'mock'));

gulp.task('build-tests', function () {
    return gulp.src(['src/backend/**/*.ts', 'test/**/*.ts'], { base: '.' })
        .pipe(ts({
            noImplicitAny: true,
        }))
        .pipe(gulp.dest('out/tests'));
})

gulp.task('lint', function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('test', ['lint', 'build', 'build-tests'], function () {
    gulp.src('out/tests/test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }))
});
