module.exports = {
  entry: './src/index',
  output: {
    filename: 'dist/react-data-components.min.js',
    library: 'ReactDataComponents',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react/addons': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx?harmony' }
    ]
  }
};
