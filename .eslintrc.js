module.exports = {
  parser: 'babel-eslint',

  plugins: [
    'react',
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    browser: true,
    node: true,
    jasmine: true,
    es6: true,
  },

  globals: {
    jest: false,
  },

  rules: {
    'strict': [ 2, 'global' ],
    'quotes': [ 2, 'single' ],
    'curly': [ 2, 'multi-line' ],
    'eqeqeq': [ 2, 'smart' ],
    'block-scoped-var': 2,
    'comma-dangle': [ 2, 'always-multiline' ],
    'no-underscore-dangle': 0,
    'react/jsx-uses-react': 1,
  },
};
