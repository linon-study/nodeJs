const path = require('path');
const webpack = require('webpack');

/*extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
    Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead 
    原因： 
    extract-text-webpack-plugin还不能支持webpack4.0.0以上的版本。 
    解决办法： 
    npm install –save-dev extract-text-webpack-plugin@next 
    会下载到+ extract-text-webpack-plugin@4.0.0-beta.0 
*/
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
  webpack4 Cannot find module '@babel/core'

解决办法一： 
  原因"babel-loader": "^8.0.0" 版本问题。 
  使用"babel-loader": "^7.1.5"即可解决该错误。

解决办法二：
  安装@babel/core依赖
  npm install --save-dev @babel/core
*/

module.exports = {
  entry: ['./src/index.js'],
  output: {
    // publicPath: '/', //这里要放的是静态资源CDN的地址
    path: path.resolve(__dirname, '../dist'),
    filename: 'build.js' // 单文件输出 ，如果多文件可在 entry :{} ,这里 filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".css", ".json"],
    alias: {
      // jquery: './src/units/jquery-1.83.min.js',
    } //配置别名可以加快webpack查找模块的速度
  },
  externals: {
    jquery: 'window.$'
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [
      {
        test: /.css$/,
        use: ExtractTextWebapckPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'] // 不再需要style-loader放到html文件内
        }),
        include: path.join(__dirname, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/
      },
      {
        test: /\.(jsx|js)?$/,
        use: {
          loader: 'babel-loader',
          // query: { //同时可以把babel配置写到根目录下的.babelrc中
          //   presets: ['es2015', 'react', 'stage-0', 'stage-1', 'env'] // env转换es6 stage-0转es7
          // }
        }
      },
      { //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 1 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    // 多入口的html文件用chunks这个参数来区分
    /* new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html'),
    filename: 'index.html',
    hash: true,//防止缓存
    minify: {
    removeAttributeQuotes: true//压缩 去掉引号
    }
    }),*/
    new ExtractTextWebapckPlugin('css/build.css'), // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
    // new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      /*
      template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
      webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
      html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
      可以通过 filename 参数指定输出的文件名
      html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
      */
      template: './index.html',

      /*
      因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
      https://github.com/jantimon/html-webpack-plugin/issues/870
      */
      // chunksSortMode: 'none'
    })
  ],
  devtool: 'eval-source-map', // 指定加source-map的方式
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/users': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, "../dist"), //静态文件根目录
    port: 3001, // 端口
    host: 'localhost',
    overlay: true,
    compress: false // 服务器返回浏览器的时候是否启动gzip压缩
  },
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
}