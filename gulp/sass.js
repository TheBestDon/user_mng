'use strict';
const Gulp = require('gulp');
const Concat = require('gulp-concat');
const Sass = require('gulp-sass');


Gulp.task('sass', () => {

    const bundleConfigs = [{
        entries: [
            './client/core/bootstrap.scss',
            './client/core/font-awesome.scss'
        ],
        dest: './public',
        outputName: 'core.min.css'
    }, {
        entries: './client/pages/account/index.scss',
        dest: './public/pages',
        outputName: 'account.min.css'
    }, {
        entries: './client/pages/admin/index.scss',
        dest: './public/pages',
        outputName: 'admin.min.css'
    }, {
        entries: './client/pages/main/index.scss',
        dest: './public/pages',
        outputName: 'main.min.css'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Sass({ compress: true }))
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});
