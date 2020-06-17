const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  entry: [
    '@babel/polyfill',
    path.join(CURRENT_WORKING_DIR, 'client/app/index.js')
  ],
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      app: 'client/app'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([
      {
        from: 'client/public'
      }
    ])
  ]
};
