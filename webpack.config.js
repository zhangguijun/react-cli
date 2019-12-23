var path = require('path')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    // 输出文件的目录
    path: path.resolve(__dirname, '../dist')
  },
  module: {},
  plugin: [],
  devServer: {}
}