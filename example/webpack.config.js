module.exports = {
  devtool: 'eval',
  cache: true,
  entry: {
    flux: './flux/app',
    table: './table/main'
  },
  output: {
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-data-components': '../../src'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
