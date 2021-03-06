var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
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
  },
  devServer: {
    publicPath: '/static/',
    contentBase: path.resolve(__dirname, ""),
    watchContentBase: true,
    compress: true,
    port: 9000
  },
};