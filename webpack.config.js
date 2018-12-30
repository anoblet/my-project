const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/components/MyApp/MyApp.ts",
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
    extensions: [".js", ".ts"],
    alias: {
      ["~"]: path.resolve(__dirname, "src")
    }
  },
  devServer: {
    https: false,
    compress: true,
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    open: true,
    historyApiFallback: {
      index: "index.html"
    }
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
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html"
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "My Progressive Web App",
      short_name: "MyPWA",
      description: "My awesome Progressive Web App!",
      background_color: "#ffffff",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve("src/assets/baseline_star_white_18dp.png"),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: "icons"
        }
      ],
      theme_color: "#fff"
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
      }
    ]),
    new RobotstxtPlugin(),
    new CleanWebpackPlugin(["dist"])
  ]
};
