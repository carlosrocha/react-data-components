var path = require('path');

module.exports = {
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-data-components.js',
    library: 'ReactDataComponents',
    libraryTarget: 'umd'
  },
  externals: [
    'react',
    'react/addons'
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony&insertPragma=React.DOM' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file' }
    ]
  }
};
