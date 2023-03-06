const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const appRootPath = path.join(__dirname, '..')

const envKeys = require('../../../plugins/env.js')(appRootPath)
const host = 'dev.patrol.etlink.ecar.com'
const port = '6971'

const babelLoaderRuleItems = [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      cacheCompression: false,
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: [require.resolve('react-refresh/babel')],
    },
  },
]

const cssLoaderAry = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: '[name]__[local]--[hash:base64:5]',
        mode: 'local',
        auto: (resourcePath) => resourcePath.indexOf('module') !== -1,
      },
    },
  },
  'postcss-loader',
]

/**
 * @type {import("webpack").Configuration}
 */
const dev = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.join(appRootPath, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    pathinfo: false,
  },
  cache: {
    type: 'memory',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ETLINK',
      filename: 'index.html',
      template: path.resolve(__dirname, '../webpack/index.html'),
      hash: true,
      cache: true,
      inject: true,
    }),
    new ReactRefreshWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new DefinePlugin({
      ...envKeys,
    }),
    new ProvidePlugin({
      React: 'react',
      process: 'process/browser',
    }),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    runtimeChunk: true,
  },
  performance: {
    // hints: 'warning',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../../../packages'),
          /node_modules\/@ecar/,
        ],
        use: babelLoaderRuleItems,
      },
      {
        test: /\.(png|jpe?g|gif)$/, // 图片
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'svg-sprite-loader',
          // 'svgo-loader',  Node.js tool for optimizing SVG files @https://github.com/svg/svgo
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
        exclude: /node_modules/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: cssLoaderAry,
      },
      {
        test: /\.less$/i,
        use: [
          ...cssLoaderAry,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                exclude: /node_modules/,
                modifyVars: {},
                javascriptEnabled: true,
                modules: true,
              },
            },
          },
        ],
      },
    ],
  },
  infrastructureLogging: {
    appendOnly: true,
    level: 'verbose',
    debug: true,
    // debug: [(name) => name.includes('webpack-dev-server')],
  },
  experiments: {
    lazyCompilation: false,
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    host,
    port,
    open: false,
    setupExitSignals: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
      },
      '/ws/': {
        target: process.env.WS_URL,
        ws: true,
        secure: false,
        changeOrigin: true,
      },
    },
    client: {
      logging: 'log',
      overlay: false,
    },
  },
}
const config = merge(base, dev)

module.exports = config
