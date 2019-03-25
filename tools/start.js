//Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';
import run from './run';
import path from 'path';

global.WATCH = true;
const bundler = webpack(webpackConfig);

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  //await run(require('./build'));
  // await run(require('./serve'));

  await new Promise(resolve => {
    browserSync({
      port:8000,
      proxy: {
        target: 'localhost:3000',
     //   baseDir: "../build/public/",
        middleware: [
          webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: webpackConfig.output.publicPath,

            // Pretty colored output
            stats: webpackConfig.stats,

            // For other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
          }),

          // bundler should be the same as above
          webpackHotMiddleware(bundler),
        ],
        // proxyRes: [
        //     function (res, req) {
        //         res.headers["Access-Control-Allow-Origin"] = "*";
        //         res.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
        //         res.headers["Access-Control-Allow-Methods"] = "PUT,POST,GET,DELETE,OPTIONS";
        //     }
        // ]
      },
      // no need to watch '*.js' here, webpack will take care of it for us,
      // including full page reloads if HMR won't work
      files: [
        '../build/public/img/*.*',
        '../build/public/fonts/*.*',
        '../build/public/**/*.css',
        '../build/public/js/**/*.*',
        '../build/public/**/*.html',
        '../build/content/**/*.*',
        '../build/templates/**/*.*'
      ]
    },resolve);
  })
}

export default start;
