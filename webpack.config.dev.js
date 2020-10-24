const { resolve } = require("path");
// const { ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "develpoment";

module.exports = {
  mode: "development",
  // mode: "production",
  entry: ["./src/js/index.js", "./src/index.html"],
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "./dist")
  },
  mode: "production",
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"]
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(sass|scss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[hash:10].[ext]",
          outputPath: "imgs"
        }
      },
      { test: /\.html$/i, loader: "html-loader" },
      {
        exclude: /\.(html|css|sass|scss|js|jpg|png|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "static"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true
    })
    // new ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.$": "jquery",
    //   "window.jQuery": "jquery"
    // })
  ],
  devServer: {
    contentBase: resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true
  },
  devtool: "source-map"
};
