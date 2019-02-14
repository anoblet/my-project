/* eslint-disable import/no-extraneous-dependencies */
const defaultSettings = require("@open-wc/testing-karma/default-settings.js");
const merge = require("webpack-merge");
const path = require("path");

module.exports = config => {
  config.set(
    merge(defaultSettings(config), {
      files: [
        // allows running single tests with the --grep flag
        config.grep ? config.grep : "src/**/*.test.js"
      ],

      webpack: {
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: "ts-loader",
              exclude: /node_modules/
            },
            {
              test: /\.scss$/,
              use: [
                "to-string-loader",
                {
                  loader: "css-loader"
                },
                "sass-loader"
              ]
            }
          ]
        },
        resolve: {
          extensions: [".js", ".ts"]
        }
      }
    })
  );
  return config;
};
