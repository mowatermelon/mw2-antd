const ESwitch = {
  Off: 0,
  Warn: 1,
  Error: 2,
}

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 0 = off, 1 = warn, 2 = error
    '@typescript-eslint/explicit-function-return-type': ESwitch.Off,
    '@typescript-eslint/explicit-module-boundary-types': ESwitch.Off,
    '@typescript-eslint/lines-between-class-members': ESwitch.Error,
    '@typescript-eslint/member-ordering': ESwitch.Error,
    // https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/member-delimiter-style.md
    '@typescript-eslint/member-delimiter-style': ESwitch.Off,
    '@typescript-eslint/no-for-in-array': ESwitch.Error,
    '@typescript-eslint/semi': ESwitch.Off,
    '@typescript-eslint/comma-dangle': ESwitch.Off,
    '@typescript-eslint/quotes': ESwitch.Off,
    '@typescript-eslint/no-empty-function': ESwitch.Off,
    '@typescript-eslint/no-explicit-any': ESwitch.Off,
    '@typescript-eslint/no-dupe-class-members': ESwitch.Error,
    '@typescript-eslint/space-before-function-paren': ESwitch.Off,
    // '@typescript-eslint/space-infix-ops': ESwitch.Error,
    '@typescript-eslint/keyword-spacing': ESwitch.Error,
    '@typescript-eslint/no-unused-vars': ESwitch.Off,
    // '@typescript-eslint/no-unused-vars': [ESwitch.Error, {
    //   'React': ESwitch.Off
    // }],
    '@typescript-eslint/no-empty-interface': [
      ESwitch.Error,
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      ESwitch.Warn,
      {
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    'no-console': ESwitch.Warn,
    semi: ['error', 'never'],
    // 'space-before-function-paren': ESwitch.Error,
  },
}
