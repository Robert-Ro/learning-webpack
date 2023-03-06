const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

/**
 * @type {import("webpack-dev-server").Configuration}
 */
const devServer = {
  compress: false,
  port: 3000,
  hot: true,
  open: false,
  setupExitSignals: true,
  historyApiFallback: true,
}
/**
 * @type {import("webpack").Configuration}
 */
const dev = {
  mode: 'development',
  
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'cheap-module-source-map',
  cache: true,
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: ['babel-loader'],
      },
    ],
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: true,
  },
  devServer,
  infrastructureLogging: {
    appendOnly: true,
    level: 'verbose',
    debug: true,
  },
}
const config = merge(base, dev)

module.exports = config
