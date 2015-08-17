module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname,
  },
  entry: {
    flux: './flux/app',
    table: './table/main',
  },
  output: {
    filename: '[name].entry.js',
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-data-components': '../../src',
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
