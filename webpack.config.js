module.exports = {
  entry: './example/main',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx' },

      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file' }
    ]
  }
};
