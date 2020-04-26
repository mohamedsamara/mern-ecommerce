const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true'],
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, 'client/public/index.html'),
      inject: true
    })
  ],
  devServer: {
    port: 5000,
    open: true,
    inline: true,
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: false,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  devtool: 'eval-source-map'
};
