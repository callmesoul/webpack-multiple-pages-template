const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  getEntry,
  getHtmlConfig
} = require('./until')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

// 配置页面
var entryObj = getEntry()
var htmlArray = []
var plugins = [ // 打包前先清空打包目录
  new CleanWebpackPlugin(),
  // 全局配置jquery
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
]
Object.keys(entryObj).forEach(function (element) {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: [element]
  })
})
// 自动生成html模板
htmlArray.forEach(function (element) {
  plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})

module.exports = {
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/js/[name]_[hash].js',
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          // 处理html 引用的图片
          attrs: ['img:src'],
          interpolate: true
        }
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
      enforce: 'pre'
    }, {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: './assets/images'
        }
      }]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: './assets/fonts'
        }
      }]
    }]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: plugins
}
