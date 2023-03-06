const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BannerPlugin } = require('webpack')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFiles: ['index'],
    cacheWithContext: false,
  },
  target: 'web',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // {
                  //   useBuiltIns: 'usage',
                  //   corejs: '3.26.1',
                  // },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: 3,
                    absoluteRuntime: true,
                    helpers: true,
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      open: false,
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'webpack config demo',
    }),
    new CleanWebpackPlugin(),
    // 打包产物加Banner头
    new BannerPlugin({ banner: 'fullhash:[fullhash], chunkhash:[chunkhash], name:[name]' }),
  ],
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'verdor',
          chunks: 'initial',
        },
      },
    },
  },
}
