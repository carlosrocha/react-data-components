var path = require('path');

module.exports = {
  devtool: 'eval',
  cache: true,
  entry: {
    docs: './docs',
    flux: './flux/app'
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      'react-data-components': '../'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'react-hot!jsx?harmony' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file' }
    ]
  }
};
