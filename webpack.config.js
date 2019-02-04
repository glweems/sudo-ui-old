const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      "sudo-scss": path.resolve(__dirname, 'src/scss/app.scss')
    },
    extensions: [
      '.js', '.css', '.scss'
    ]
  },
  plugins: [
    new webpackDashboard(), // Adding webpack-dashboard plugin. Add more plugins by like this - 
    // new BundleAnalyzerPlugin(),
    // new SuperAwesomePlugin(),
    // and may more
    new MiniCssExtractPlugin({
      filename: "css/app.css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/scss',
        to: 'scss',
        toType: 'dir'
      },
    ], { copyUnmodified: false })
  ],
  module: {

    rules: [

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader", "sass-loader"
        ]
      }
    ],
  },
  devServer: {
    contentBase: './src'
  }
}
