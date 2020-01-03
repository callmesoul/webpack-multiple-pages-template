const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')


module.exports = merge(base, {
  devtool: 'source-map', // source-map 调试
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [{
        loader: MiniCssPlugin.loader,
        options: {
          // 这里可以指定一个 publicPath
          // 默认使用 webpackOptions.output中的publicPath
          // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
          // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
          publicPath: '../../'
        }
      }, {
        loader: 'css-loader',
        options: {
          // 开始时生成map 文件便于调试
          sourceMap: true
        }
      }, 'sass-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')
          ]
        }
      }]
    }]
  },
  plugins: [
    // 分离css文件的导出目录
    new MiniCssPlugin({
      filename: './assets/styles/[name]_[hash].css'
    }),
    // 优化或压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g, // 匹配需要处理的资源名字
      cssProcessor: require('cssnano'), // 用户压缩和优化css的处理器，默认是cssnano
      cssProcessorPluginOptions: { // cssProcessor 的选项
        preset: ['default', {
          // 去除注释
          discardComments: {
            removeAll: true
          }
        }]
      },
      canPrint: true // 表示插件能够console中打印信息， 默认为true
    })
  ]
})
