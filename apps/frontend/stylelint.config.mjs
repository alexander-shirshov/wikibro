/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.{scss,css}'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'color-function-alias-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'value-keyword-case': null,
    'media-feature-range-notation': null,
    'scss/operator-no-unspaced': null,
    'custom-property-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'rule-empty-line-before': null,
  },
};
