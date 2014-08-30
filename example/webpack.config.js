var path = require('path');

module.exports = {
  entry: './main',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [ '../node_modules', '../' ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file' }
    ]
  }
};
