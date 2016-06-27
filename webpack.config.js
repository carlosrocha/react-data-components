module.exports = {
  entry: './src/index',
  output: {
    filename: 'dist/react-data-components.min.js',
    library: 'ReactDataComponents',
    libraryTarget: 'umd',
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
    ],
  },
};
