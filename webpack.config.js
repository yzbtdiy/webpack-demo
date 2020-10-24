const { resolve } = require("path");
// const { ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

process.env.NODE_ENV = "production";

const commonCssLoader = [
  { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
  "css-loader",
  "postcss-loader"
];

module.exports = {
  mode: "production",
  // mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: "js/bundle.js",
    path: resolve(__dirname, "./dist")
  },
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
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: "75",
                      firefox: "60",
                      ie: "10"
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader", "postcss-loader"]
        use: [
          // { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          // "css-loader",
          // "postcss-loader"
          ...commonCssLoader
        ]
      },
      {
        test: /\.(sass|scss)$/i,
        // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        use: [
          // { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          // "css-loader",
          // "postcss-loader",
          ...commonCssLoader,
          "sass-loader"
        ]
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
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css"
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
    port: 8080
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`
      new CssMinimizerPlugin()
    ]
  }
};
