module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'guard-for-in': 'off',
    'max-len': [2, {'code': 120, 'tabWidth': 2, 'ignoreUrls': true}],
  },
};
