const path = require('path')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: path.resolve(__dirname, '../src/main.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.less', '.scss', '.sass'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: 'global',
          //     importLoaders: 2,
          //     sourceMap: false, // turned off as causes delay
          //   },
          // },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'webpack config demo',
    }),

    new ProvidePlugin({
      process: 'process/browser',
    }),
    new DefinePlugin({
      // ...envKeys,
    }),
  ],
}

module.exports = config
