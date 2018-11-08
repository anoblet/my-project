const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/components/MyApp/MyApp.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          {
            loader: "css-loader"
          },
          "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      ["~"]: path.resolve(__dirname, "src")
    }
  },
  devServer: {
    https: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    namedModules: true,
    namedChunks: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: "index.html"
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: 'icons'
        },
        {
          src: path.resolve('src/assets/large-icon.png'),
          size: '1024x1024', // you can also use the specifications pattern
          destination: 'icons'        
        }
      ],
      theme_color: '#fff'
    })
  ]
};