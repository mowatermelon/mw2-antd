const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 80,
  jsxSingleQuote: true,
  bracketSpacing: true,
}
