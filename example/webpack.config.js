const path = require('path');

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname,
  },
  entry: {
    table: './table/main',
    redux: './redux/index',
  },
  output: {
    filename: '[name].entry.js',
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-data-components': path.join(__dirname, '../src'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
