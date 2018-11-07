const path = require('path');

module.exports = {
  entry: './src/components/MyApp/MyApp.ts',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
  }
};