module.exports = {
  'env': {
    'mocha': true,
    'browser': true,
    'es6': true,
    'jest/globals': true
  },
  'extends': [
    'standard',
    'plugin:react/recommended'
  ],
  'plugins': [
    'standard',
    'promise',
    'jest'
  ],
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
      'ecmaVersion': 2018,
      'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'space-before-function-paren': ['error','never'],
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  }
}
