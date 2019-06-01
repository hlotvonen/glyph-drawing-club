var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: '',
  entry: [
    './src/index'
  ],
  optimization: {
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      minimizer: [
        new UglifyJSPlugin({
            uglifyOptions: {
              beautify: false,
              compress: true,
              ecma: 6,
              output: {
                comments: false
              },
              compress: {
                dead_code: true
              }
            }
        })]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/react', '@babel/env']
        }
      },
      include: path.join(__dirname, 'src')
    }]
  }
};
