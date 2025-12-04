//ES6가아닌 node에서 많이 사용하능 common.js문법사용

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config(); //process.env.KAKAO_KEY로 접근가능하게 됌!

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "static/js/[name].[contenthash:8].js", //같은js파일이 import되지않게 추가해주는 용도
    clean: true,
  },

  devtool: isProduction ? false : "eval-source-map",
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
            ],
          },
        ],
      },
    ],
  },

  plugins: [
    isProduction
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true,
        })
      : new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
    isProduction
      ? new MiniCssExtractPlugin({
          linkType: false,
          filename: "[name].[contenthash:8].css",
        })
      : undefined,
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
};
