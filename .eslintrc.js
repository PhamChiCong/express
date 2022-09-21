const ESLINT = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
};

module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
  },

  globals: {
    getEnv: 'readonly',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  env: {
    node: true,
    es2020: true,
  },

  'rules': {
    'semi': [ESLINT.ERROR, 'always'],
    'quotes': [ESLINT.ERROR, 'single'],
    'no-console': ESLINT.OFF,
    'space-before-blocks': ESLINT.WARNING,
    'no-trailing-spaces': ESLINT.WARNING,
    'no-multi-spaces': ESLINT.WARNING,
    'eqeqeq': ESLINT.WARNING,
    'valid-typeof': ESLINT.ERROR,
    'no-unreachable': ESLINT.WARNING,
    'no-cond-assign': ESLINT.WARNING,
    'no-constant-condition': ESLINT.WARNING,
    'no-dupe-keys': ESLINT.WARNING,
    'no-duplicate-case': ESLINT.WARNING,
    'arrow-spacing': ESLINT.WARNING,
    'keyword-spacing': [ESLINT.ERROR, { 'before': true }],
    'no-whitespace-before-property': ESLINT.WARNING,
    'space-in-parens': ESLINT.WARNING,
    'space-infix-ops': ESLINT.WARNING,
    'semi-spacing': ESLINT.WARNING,
    'no-undef': ESLINT.OFF,
    'no-useless-catch': ESLINT.OFF,
    'array-bracket-spacing': [ESLINT.WARNING, 'never'],
    'object-curly-spacing': [ESLINT.WARNING, 'always'],
    'object-shorthand': ESLINT.WARNING,
    'comma-dangle': [ESLINT.WARNING, {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    'comma-spacing': [ESLINT.WARNING, {
      before: false,
      after: true,
    }],
    'key-spacing': [ESLINT.WARNING, { 'beforeColon': false }],
    'no-multiple-empty-lines': [ESLINT.WARNING, {
      'max': ESLINT.WARNING,
      'maxEOF': ESLINT.WARNING,
      'maxBOF': ESLINT.OFF,
    }],
    'no-unused-vars': [ESLINT.WARNING, { 'vars': 'local' }],
    'no-case-declarations': ESLINT.ERROR,
    'func-call-spacing': [ESLINT.ERROR, 'never'],
    'space-before-function-paren': [ESLINT.WARNING, {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'import/prefer-default-export': ESLINT.OFF,
    'no-param-reassign': ESLINT.OFF,
    'arrow-body-style': ESLINT.OFF,
    'no-useless-return': ESLINT.OFF,
    'max-len': ['error', { 'code': 200 }],
    'consistent-return': ESLINT.OFF,
    'import/no-cycle': ESLINT.OFF,
    'linebreak-style': ESLINT.OFF,
    '@typescript-eslint/no-explicit-any': ESLINT.OFF,
    '@typescript-eslint/explicit-module-boundary-types': ESLINT.OFF,
    '@typescript-eslint/no-var-requires': ESLINT.OFF,
    '@typescript-eslint/ban-ts-comment': ESLINT.OFF,
  },
};
