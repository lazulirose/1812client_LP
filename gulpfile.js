var gulp = require("gulp");
var scss = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var pug = require("gulp-pug");

var concat = require("gulp-concat");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var img = require("gulp-imagemin");


gulp.task("default", ["server"], function () {
    gulp.watch("src/pug/**/*.pug", ["pug"]);
//    gulp.watch(["src/js/**/*.js", "!src/js/min/**/*.js"],["js"]);
    gulp.watch(["src/scss/**/*.scss","!src/scss/**/_*.scss"], ["scss"]);
    gulp.watch("src/images/**/*.jpg", ["img"]);
});
gulp.task("server", function () {
    browser({
        server: {
            baseDir: "./src/"
        }
    });
});
gulp.task("pug", function () {
    gulp.src(["src/pug/**/*.pug", "!src/pug/**/_*.pug"])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("src/"));
});
//gulp.task("js", function () {
//    gulp.src(["src/js/**/*.js", "!src/js/min/**/*.js"])
//        .pipe(plumber())
//        .pipe(scss())
//        .pipe(autoprefixer())
//        .pipe(gulp.dest("src/js"))
//        .pipe(rename({
//            suffix: ".min"
//        }))
//        .pipe(uglify())
//        .pipe(gulp.dest("src/js"))
//        .pipe(browser.reload({
//            stream: true
//        }));
//});

gulp.task("scss", function () {
    gulp.src(["src/scss/**/*.scss", "!src/scss/**/_*.scss"])
        .pipe(plumber())
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(uglify())
 //       .pipe(gulp.dest("src/css"))
        .pipe(browser.reload({
            stream: true
        }))
});
gulp.task("img", function () {
    return gulp.src("src/images/*")
        .pipe(img({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest("src/images/dist"));
});

