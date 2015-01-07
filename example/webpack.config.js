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
      { test: /\.js$/, loader: 'jsx?harmony' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
