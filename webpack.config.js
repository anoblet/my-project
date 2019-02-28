const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlLoader = require("html-loader");
const WebpackLighthousePlugin = require("webpack-lighthouse-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
var Visualizer = require("webpack-visualizer-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");

// const commonConfig =

module.exports = {
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "to-string-loader",
          {
            loader: "css-loader"
          },
          "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  devServer: {
    https: false,
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
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
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true
      }
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: "initial"
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "Andrew Noblet",
      short_name: "AN",
      description: "Andrew Noblet",
      background_color: "#000000",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      theme_color: "#000000",
      inject: true
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new CopyWebpackPlugin([
      {
        from: "node_modules/@webcomponents/webcomponentsjs/*.js",
        to: "js/webcomponentsjs",
        flatten: true
      },
      {
        from: "src/assets/*",
        to: "./",
        flatten: true
      },
      {
        from: "node_modules/material-design-icons/iconfont/*",
        to: "./font",
        flatten: true
      }
    ]),
    new RobotstxtPlugin(),
    new Visualizer()
    // new WebpackLighthousePlugin({
    //   url: "http://localhost:8080/",
    //   perf: true
    // })
  ]
};
