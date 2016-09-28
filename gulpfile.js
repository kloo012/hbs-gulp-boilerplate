// Include gulp and webpack
var gulp          = require('gulp');

var handlebars    = require('gulp-compile-handlebars');
var rename        = require('gulp-rename');
var browserSync   = require('browser-sync').create();
var del           = require('del');
var runSequence   = require('run-sequence');

var paths = {
  templates: 'src/templates/**/*.hbs'
};

// Start task defs
// 'clean' - clean the build folder
gulp.task('clean', function() {
  return del(['./build/**/*']);
});

// 'html' - compiles hbs files to the build folder
gulp.task('html', function () {
    var templateData = {
    },
    options = {
        partials : {
            defaultContent : '<h2>Condenser</h2>'
        },
        batch : ['./src/templates/scope-and-closures'],
        helpers : {
        }
    }

    return gulp.src('src/templates/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename({
            extname: ".html",
            basename: "index"
        }))
        .pipe(gulp.dest('./build'));
});

// 'browser-sync' - starts a server at localhost:3000
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

     gulp.watch("src/templates/**/*.hbs", ['html']);
     gulp.watch("build/*.html").on('change', browserSync.reload);
});

// 'default' - separating the build tasks out
gulp.task('default', ['clean'], function(cb) {
    runSequence('html', 'browser-sync', cb);
});
