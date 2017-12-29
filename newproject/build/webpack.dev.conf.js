'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 配置本地数据使用添加以下内容
const jsonServer = require('json-server')
const apiServer = jsonServer.create()
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
// 配置本地结束
// apiServer.use(middlewares)
// apiServer.use(apiRouter)
// apiServer.listen(PORT + 1, () => {
//   console.log('JSON Server is running')
// })

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 这下面三行也是配置json请求的
apiServer.use(middlewares)
// 添加代理服务后，apiRouter路径也要改
// apiServer.use(apiRouter)
apiServer.use('/api', apiRouter)
// 默认监听的是3000，应该设置成port，但是设置成port会显示未定义！！！！！！！！！
// apiServer.listen(8080 + 1, () => {
//   console.log('JSON Server is running')
// })
// 配置本地结束
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      // 添加本地服务
      apiServer.listen(8080 + 1, () => {
        console.log('JSON Server is running')
      })
      resolve(devWebpackConfig)
    }
  })
})
