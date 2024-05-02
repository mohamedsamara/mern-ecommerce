const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: 'development',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, 'public/index.html'),
      inject: true
    })
  ],
  devServer: {
    port: 8080,
    open: true,
    inline: true,
    compress: true,
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  devtool: 'eval-source-map'
};

module.exports = webpackMerge(common, config);
