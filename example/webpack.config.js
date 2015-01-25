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
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=image/svg+xml' }
    ]
  }
};
