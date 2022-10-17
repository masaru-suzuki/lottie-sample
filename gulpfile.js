/**
 * import
 */
const { src, dest, lastRun, parallel, watch, series } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const fs = require('fs');
const data = require('gulp-data');
const pug = require('gulp-pug-3');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const gulpWebp = require('gulp-webp');
const connectSSI = require('connect-ssi');
const gulpIf = require('gulp-if');
const del = require('del');

/**
 * initial settings
 */
let webpackConfig;
if (process.env.NODE_ENV === 'production') {
  webpackConfig = require('./webpack.prod');
} else {
  webpackConfig = require('./webpack.dev');
}

const srcDir = './src/';
const baseDir = './public/';

const srcPath = {
  html: [`${srcDir}views/**/*.pug`,  `!${srcDir}views/**/_*.pug`],
  css: `${srcDir}styles/*.scss`,
  img: `${srcDir}images/**`,
  webp: `${srcDir}images/**/*.+(jpg|jpeg|png)`,
  copy: `${srcDir}dist/**/*`,
};

const destPath = {
  html: baseDir,
  css: `${baseDir}assets/css`,
  js: `${baseDir}assets/js`,
  img: `${baseDir}assets/images`,
  copy: baseDir,
};

const watchPath = {
  html: `${srcDir}views/**/*`,
  css: `${srcDir}styles/**/*`,
  js: `${srcDir}scripts/**/*`,
  img: `${srcDir}images/**/*`,
  webp: `${srcDir}images/**/*.+(jpg|jpeg|png)`,
  copy: `${srcDir}dist/**/*`,
  reload: [
    `${baseDir}**/*.html`,
    `${baseDir}**/*.css`,
    `${baseDir}**/*.js`,
    `${baseDir}**/*.jpg`,
    `${baseDir}**/*.gif`,
    `${baseDir}**/*.png`,
    `${baseDir}**/*.svg`,
  ],
};


/**
 * compile html
 */
const html = () => {
  // lastRun をオプションに入れると _**.pugファイルを編集した際に、reloadが走らない
  // return src(srcPath.html, {
  //   since: lastRun(html),
  // })
  return src(srcPath.html)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      data((file) => {
        return {
          site: JSON.parse(fs.readFileSync(`${srcDir}data/site.json`)),
          mockup: JSON.parse(fs.readFileSync(`${srcDir}data/mockup.json`)),
        };
      })
    )
    .pipe(
      pug({
        basedir: './src',
        pretty: true,
      })
    )
    .pipe(dest(destPath.html));
};

/**
 * compile css
 */
const postCssPlugins = [
  autoprefixer({ grid: 'no-autoplace', cascade: false }),
  cssDeclarationSorter({ order: 'concentric-css' }),
];

const css = () => {
  return src(srcPath.css)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(gulpIf(process.env.NODE_ENV !== 'production', sourcemaps.write(`./maps/`)))
    .pipe(dest(destPath.css));
};

/**
 * compile js
 */
const js = (done) => {
  webpackStream(webpackConfig, webpack)
    .on('error', function (e) {
      this.emit('end');
    })
    .pipe(dest(destPath.js));
  done();
};

/**
 * optimazed images
 */
const img = () => {
  return src(srcPath.img, {
    since: lastRun(img),
  })
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: false,
          optimizationLevel: 3,
          colors: 180,
        }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(destPath.img));
};

/**
 * generate webp
 */
const webp = () => {
  return src(srcPath.webp, {
    since: lastRun(webp),
  })
    .pipe(
      rename((path) => {
        path.basename += path.extname;
      })
    )
    .pipe(gulpWebp())
    .pipe(dest(destPath.img));
};

/**
 * clean
 */
const clean = () => {
    return del(['public/*/']);
};

/**
 * browser sync
 */
const bs = (done) => {
  browserSync.init({
    server: {
      baseDir: baseDir,
      middleware: [
        connectSSI({
          baseDir: __dirname + '/public',
          ext: '.html',
        }),
      ],
    },
    ghostMode: false,
  });
  done();
};

/**
 * browser reroad
 */
const reload = (done) => {
  browserSync.reload();
  done();
};


/**
 * copy
 */
const copy = () => {
  return src(srcPath.copy).pipe(dest(destPath.copy));
};


exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.webp = webp;
exports.clean = clean;
exports.copy = copy;

// exports.build = parallel([html, css, js, img, webp]);
exports.build = series(clean, copy, html, css, js, img, webp);

exports.default = parallel([html, copy, css, js, img, webp, bs], () => {
  watch(watchPath.html, series(html, reload));
  watch(watchPath.copy, series(copy, reload));
  watch(watchPath.css, series(css, reload));
  watch(watchPath.js, series(js, reload));
  watch(watchPath.img, series(img, reload));
  watch(watchPath.webp, series(webp, reload));
  // watch(watchPath.reload, reload);
});
