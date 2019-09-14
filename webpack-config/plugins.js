const merge = require("webpack-merge");

const htmlWebpackPlugin = require("./plugins/html-webpack-plugin.js");

module.exports = merge(htmlWebpackPlugin);
