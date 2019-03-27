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

const config = {
  // entry: ['./src/index.js'],
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/index.js'
    ],
  },
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
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { //同时可以把babel配置写到根目录下的.babelrc中
            // presets: ['es2015', 'react', 'stage-0', 'stage-1'], // env转换es6 stage-0转es7
            plugins: [
              // ['react-hot-loader/babel'],
              ['import', { "libraryName": "antd", "style": "css" }]  //处理antd框架css不显示问题
            ]
          }
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader", },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // localIndetName: "[name]__[local]___[hash:base64:5]"
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules|antd\.css/,
        use: [
          { loader: "style-loader", },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // 改动
              modules: true,   // 新增对css modules的支持
              // localIndetName: '[name]__[local]__[hash:base64:5]', //
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules|antd\.css/,
        use: [
          { loader: "style-loader", },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // 改动
              // modules: true,   // 新增对css modules的支持
              // localIndetName: '[name]__[local]__[hash:base64:5]', //
            },
          },
        ],
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
    //webpack热更新
    new webpack.HotModuleReplacementPlugin(),
    // 多入口的html文件用chunks这个参数来区分
    
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
  // devServer: {
  //   proxy: { // proxy URLs to backend development server
  //     '/users': 'http://localhost:3000'
  //   },
  //   contentBase: path.join(__dirname, "../dist"), //静态文件根目录
  //   port: 3001, // 端口
  //   host: 'localhost',
  //   overlay: true,
  //   compress: false // 服务器返回浏览器的时候是否启动gzip压缩
  // },
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
}

export default config;