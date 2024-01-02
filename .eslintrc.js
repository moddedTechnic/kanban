module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:vue/vue3-recommended'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Style
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'func-call-spacing': 'off',

    // Quality
    'no-use-before-define': 'warn',
    'require-await': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
  },
}
