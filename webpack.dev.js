const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: ['./src/js/index.js', './src/scss/style.scss'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/bundle.js',
  },
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/views'),
        use: ['raw-loader'],
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
    stats: {
      colors: true,
      modules: false,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      env: true,
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new MiniCssExtractPlugin({
      filename: '/style.css',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8000' }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img'),
        to: path.resolve(__dirname, 'build/img'),
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/video'),
        to: path.resolve(__dirname, 'build/video'),
      },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/index.html'),
      filename: path.resolve(__dirname, 'build/index.html'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'src/walkthrough.html'),
      filename: path.resolve(__dirname, 'build/walkthrough.html'),
    }),
  ],
};
