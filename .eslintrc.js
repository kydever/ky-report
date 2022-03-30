module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-mutating-props': 0
  },
}