const path = require('path')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MapleHtmlWebpackPlugin = require('@liutsing/html-webpack-plugin')

const { readFileSync, writeFileSync } = require('fs')

const reactContent = readFileSync(
  path.resolve(
    __dirname,
    '../../../node_modules/.pnpm/react@18.2.0/node_modules/react/umd/react.production.min.js'
  )
).toString()
const reactDOMContent = readFileSync(
  path.resolve(
    __dirname,
    '../../../node_modules/.pnpm/react-dom@18.2.0_react@18.2.0/node_modules/react-dom/umd/react-dom.production.min.js'
  )
).toString()
writeFileSync(
  path.resolve(__dirname, '../public/react18.min.js'),
  `${reactContent}${reactDOMContent}`
)

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: path.resolve(__dirname, '../src/main.tsx'),

  // NOTE @antv/g2 按需加载
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    cacheWithContext: false,
  },
  target: 'web',
  externals: {
    // @https://www.webpackjs.com/configuration/externals/#externalstype
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'webpack config demo',
    }),
    new MapleHtmlWebpackPlugin(),
    // [
    // { src: './react18.min.js', tagName: 'script' },
    // {
    //   tagName: 'script',
    //   content: `console.log('123132')`,
    // },
    // ]
    new ProvidePlugin({
      // React: 'react',
      process: 'process/browser',
    }),
    new DefinePlugin({
      // ...envKeys,
    }),
  ],
}

module.exports = config
