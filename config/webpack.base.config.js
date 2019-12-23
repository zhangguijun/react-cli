//  webpack 开发的基本配置

const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: ["./src/index.js"],
  output: {
    //  输出文件配置
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@assert': path.resolve(__dirname, 'src/assert')
    }
  },
  module: {
    rules: [
      {
        test: /\(.js|.jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "happypack/loader?id=happyBabel"
          }
        ]
      },
      {
        test: /\.(le|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader", // 使用 postcss 为 css 加上浏览器前缀
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 10 * 1024 // 限制图片大小，小于这个数直接把图片塞到js
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // 使用base64进行转换， 大小限制小于5KB， 否则使用svg输出
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack配置',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'src/index.html'),
      minify: {
        collapseWhitespace: true // 去除空白
      }
    }),
    // 生成单独的css 和 js 加快页面渲染
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5].css",
      chunkFilename: "[id]-[hash:5].css"
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      // 共享进程池threadPool: HappyThreadPool 代表共享进程池，
      // 即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    })
  ],
  performance: false // 关闭性能提示
}