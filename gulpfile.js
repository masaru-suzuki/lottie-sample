/**
 * import
 */
const { src, dest, lastRun, parallel, watch } = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const fs = require('fs');
const data = require('gulp-data');
const pug = require('gulp-pug-3');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const gulpWebp = require('gulp-webp');
const connectSSI = require('connect-ssi');

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
  html: [`${srcDir}views/**/*.pug`, `!${srcDir}views/**/_*.pug`],
  css: `${srcDir}styles/*.scss`,
  img: `${srcDir}images/**`,
  webp: `${srcDir}images/**/*.+(jpg|jpeg|png)`,
};

const destPath = {
  html: baseDir,
  css: `${baseDir}assets`,
  js: `${baseDir}assets`,
  img: `${baseDir}assets/images`,
};

const watchPath = {
  html: `${srcDir}views/**/*`,
  css: `${srcDir}styles/**/*`,
  js: `${srcDir}scripts/**/*`,
  img: `${srcDir}images/**/*`,
  webp: `${srcDir}images/**/*.+(jpg|jpeg|png)`,
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
  return src(srcPath.html, {
    since: lastRun(html),
  })
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
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
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

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.webp = webp;

exports.build = parallel([html, css, js, img, webp]);
// exports.build = parallel([html, css, js]);

exports.default = parallel([html, css, js, img, webp, bs], () => {
  // exports.default = parallel([html, css, js, bs], () => {
  watch(watchPath.html, html);
  watch(watchPath.css, css);
  watch(watchPath.js, js);
  watch(watchPath.img, img);
  watch(watchPath.webp, webp);
  watch(watchPath.reload, reload);
});
