const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
    devtool: 'cheap-module-eval-source-map', // source-map 调试
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 设置服务器访问的目录
        host: 'localhost', // 服务器的ip地址
        port: 8080, // 端口
        open: true, // 自动打开页面
        hot: true, // 热替换
        inline: true,
        overlay: true,
        historyApiFallback: false, //true默认打开index.html，false会出现一个目录，一会演示
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ['style-loader', {
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
        // 热替换设置
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})