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
const template = require('gulp-template');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const gulpWebp = require('gulp-webp');
const connect = require('gulp-connect-php');
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
const baseDir = './docs/';
const DEVELOPMENT_DIR = '';
const PRODUCTION_DIR = 'https://masaru-suzuki.github.io/web-template-static';

const srcPath = {
  html: [`${srcDir}views/**/*.pug`, `!${srcDir}views/**/_*.pug`, `!${srcDir}views/includes/**/*.pug`],
  // html: [`${srcDir}views/**/*.pug`, `!${srcDir}views/**/_*.pug`],
  php: `${srcDir}views/includes/**/*.pug`,
  css: `${srcDir}styles/*.scss`,
  img: `${srcDir}images/**`,
  webp: `${srcDir}images/**/*.+(jpg|jpeg|png)`,
  copy: `${srcDir}dist/**/*`,
};

const destPath = {
  html: baseDir,
  php: `${baseDir}includes`,
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
  reload: [`${baseDir}**/*.html`, `${baseDir}**/*.php`, `${baseDir}**/*.css`, `${baseDir}**/*.js`, `${baseDir}**/*.jpg`, `${baseDir}**/*.gif`, `${baseDir}**/*.png`, `${baseDir}**/*.svg`],
};

/**
 * compile html
 */
const html = async () => {
  // lastRun をオプションに入れると _**.pugファイルを編集した際に、reloadが走らない
  // return src(srcPath.html, {
  //   since: lastRun(html),
  // })
  return await src(srcPath.html)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )

    .pipe(
      data((file) => {
        return {
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
    // TODO:gulp dataの方で書き換えできる？
    // エスケープさせない方法はない？
    .pipe(gulpIf(process.env.NODE_ENV === 'production', template({ path: PRODUCTION_DIR })))
    .pipe(gulpIf(process.env.NODE_ENV !== 'production', template({ path: DEVELOPMENT_DIR })))
    .pipe(dest(destPath.html));
};

/**
 * compile php
 */
const php = () => {
  return src(srcPath.php)
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
    .pipe(
      rename({
        extname: '.php',
      })
    )
    .pipe(dest(destPath.php));
};

/**
 * compile css
 */
const postCssPlugins = [autoprefixer({ grid: 'no-autoplace', cascade: false }), cssDeclarationSorter({ order: 'concentric-css' })];
const prodPostCssPlugins = [autoprefixer({ grid: 'no-autoplace', cascade: false }), cssDeclarationSorter({ order: 'concentric-css' }), cssnano({ preset: 'default' })];

const css = () => {
  return src(srcPath.css)
    .pipe(gulpIf(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', postcss(prodPostCssPlugins)))
    .pipe(gulpIf(process.env.NODE_ENV !== 'production', sourcemaps.write(`./maps/`), postcss(postCssPlugins)))
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
          plugins: [
            // viewBox属性を削除する（widthとheight属性がある場合）。
            // 表示が崩れる原因になるので削除しない。
            { removeViewBox: false },
            // <metadata>を削除する。
            // 追加したmetadataを削除する必要はない。
            { removeMetadata: false },
            // SVGの仕様に含まれていないタグや属性、id属性やvertion属性を削除する。
            // 追加した要素を削除する必要はない。
            { removeUnknownsAndDefaults: false },
            // コードが短くなる場合だけ<path>に変換する。
            // アニメーションが動作しない可能性があるので変換しない。
            { convertShapeToPath: false },
            // 重複や不要な`<g>`タグを削除する。
            // アニメーションが動作しない可能性があるので変換しない。
            { collapseGroups: false },
            // SVG内に<style>や<script>がなければidを削除する。
            // idにアンカーが貼られていたら削除せずにid名を縮小する。
            // id属性は動作の起点となることがあるため削除しない。
            { cleanupIDs: false },
          ],
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
  return del(['docs']);
};

/**
 * browser sync
 */
const bs = () => {
  browserSync.init({
    server: {
      baseDir: 'docs',
      ghostMode: false,
      notify: false,
    },
  });
};

/**
 * browser reload
 */
const reload = (done) => {
  browserSync.reload();
  done();
};

/**
 * copy
 */
const copy = () => {
  return src(srcPath.copy, { dot: true }).pipe(dest(destPath.copy));
};

exports.html = html;
exports.php = php;
exports.css = css;
exports.js = js;
exports.img = img;
exports.webp = webp;
exports.clean = clean;
exports.reload = reload;
exports.copy = copy;

// exports.build = series(clean, copy, html, php, css, js, img, webp);
exports.build = series(clean, copy, html, css, js, img, webp);
// exports.compile = series(html, php, css, js);
exports.compile = series(html, css, js);
// exports.default = parallel([html, php, copy, css, js, img, webp, bs], () => {
exports.default = parallel([html, copy, css, js, img, webp, bs], () => {
  watch(watchPath.html, series(html, reload));
  watch(watchPath.copy, series(copy, reload));
  watch(watchPath.css, series(css, reload));
  watch(watchPath.js, series(js, reload));
  watch(watchPath.img, series(img, reload));
  watch(watchPath.webp, series(webp, reload));
});
