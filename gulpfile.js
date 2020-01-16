var gulp = require('gulp');

//Sass convert to css
var sass = require("gulp-sass");

//Remove comments from css
var stripCssComments = require("gulp-strip-css-comments");

//Minify CSS
var cssmin = require("gulp-cssmin");

var browserSync = require('browser-sync').create();

//include
var include = require('gulp-include');

//inject
var inject = require('gulp-inject');

//concat
var concat = require('gulp-concat');

//clean
var clean = require('gulp-clean');

//build directory
var buildDir = 'www';

var scripts =
  [
      'src/app/bower_components/angular/angular.min.js',
      'src/app/bower_components/angular-route/angular-route.min.js',
      'src/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'src/app/bower_components/bootstrap/dist/css/bootstrap.min.css',
      'src/app/*.js',
      'src/app/controller/*.js',
      'src/app/services/*.js',
      'src/app/directives/*.js'
  ]


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'www',
            port:9090
        }
    })
})


//main App js and route js build.
gulp.task('appJsBuild', function () {
    return gulp
        .src('src/app/*.js')
       .pipe(gulp.dest(buildDir))
          .pipe(browserSync.reload({
              stream: true
          }))
});

gulp.task('injectjs', function () {

  var injectSrc = gulp.src(scripts);
  //var injectAppSrc = gulp.src(appSrc);
  return gulp
    .src('src/app/*.html')
    .pipe(include())
    .pipe(inject(injectSrc, {ignorePath: 'src/app', addRootSlash: false},{relative: true}))
    .pipe(gulp.dest(buildDir))
    .pipe(browserSync.reload({
      stream: true
    }))

});

//sass build
gulp.task('sass', function () {
    return gulp.src([
        'src/app/assets/sass/main.scss'
    ])
        .pipe(sass())
        .pipe(concat('styles.css'))
        //.pipe(livereload())
        .pipe(gulp.dest(buildDir + '/css', {overwrite: true}))
        .pipe(browserSync.reload({
            stream: true
        }))

});

//views build
gulp.task('views', function () {
    return gulp
        .src('src/app/views/*.html')
        .pipe(gulp.dest(buildDir + '/views'))
      .pipe(browserSync.reload({
          stream: true
      }));
});

//images build
gulp.task('images', function () {
    return gulp
        .src('src/app/assets/images/*.*')
        .pipe(gulp.dest(buildDir + '/img'))
      .pipe(browserSync.reload({
          stream: true
      }));
});

//fonts build
gulp.task('fonts', function () {
    return gulp
        .src(['src/app/assets/fonts/*.*'])
        .pipe(gulp.dest(buildDir + '/fonts'))
      .pipe(browserSync.reload({
          stream: true
      }));
})

//jsbuild
gulp.task('js', function () {
    return gulp
        .src('src/app/assets/js/*.*')
        .pipe(gulp.dest(buildDir + '/js'))
      .pipe(browserSync.reload({
          stream: true
      }));
})

//vendor css build
gulp.task('css', function () {
    return gulp
        .src('src/app/assets/css/*.*')
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('controller', function () {
    return gulp.src(['src/app/controller/*.js'],{base:'src/app'})
        .pipe(gulp.dest(buildDir))
      .pipe(browserSync.reload({
          stream: true
      }));
});

gulp.task('services', function () {
    return gulp.src(['src/app/services/*.js'],{base:'src/app'})
        .pipe(gulp.dest(buildDir))
      .pipe(browserSync.reload({
          stream: true
      }));
});

gulp.task('directives', function () {
    return gulp.src(['src/app/directives/*.js'],{base:'src/app'})
        .pipe(gulp.dest(buildDir))
      .pipe(browserSync.reload({
          stream: true
      }));
});




gulp.task('bowerFilesJs', function () {
    return gulp.src([
        'src/app/bower_components/angular/angular.min.js',
        'src/app/bower_components/angular-route/angular-route.min.js',
        'src/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'src/app/bower_components/bootstrap/dist/css/bootstrap.min.css',
    ], {base:"src/app"})
      .pipe(gulp.dest(buildDir))
      .pipe(browserSync.reload({
          stream: true
      }));
});

 //Watch sass
 gulp.task('watch', ['browserSync','appJsBuild','views','fonts','sass','js','images','controller','services','directives','injectjs','css'],function() {
 //livereload.listen();
   gulp.watch('src/app/assets/images/*.*',['images']);
   //gulp.watch('src/assets/fonts/**/*.*',['fonts']);
   gulp.watch('src/app/assets/sass/**/*.scss',['sass']);
   gulp.watch('src/app/controller/*.js',['controller']);
   gulp.watch('src/app/services/*.js',['services']);
   gulp.watch('src/app/directives/*.js',['directives']);
   gulp.watch('src/app/*.html',['injectjs']);
   gulp.watch('src/app/*.js',['appJsBuild']);
   gulp.watch('src/app/views/*.html',['views'])

 });

gulp.task('cleanLess', function () {
    return gulp.src(buildDir + '/css/*.css', {read: false}).pipe(clean());
});
gulp.task('cleanScript', function () {
    return gulp.src(buildDir + '/**/*.js', {read: false}).pipe(clean());
});
gulp.task('cleanHTML', function () {
    return gulp.src(buildDir + '/**/*.html', {read: false}).pipe(clean());
});

gulp.task('clean', ['cleanLess', 'cleanScript', 'cleanHTML']);


gulp.task('start', ['watch', 'bowerFilesJs', 'injectjs']);
