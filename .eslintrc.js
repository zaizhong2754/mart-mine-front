/* eslint-env node */
// 用于指定 ESLint 执行环境为 Node.js 环境

// 引入 @rushstack/eslint-patch/modern-module-resolution 模块，用于解决模块解析的问题
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true, // 表示该配置文件为 ESLint 根配置文件，停止在父级目录中查找其它配置文件
  extends: [
    'plugin:vue/vue3-essential', // 扩展了 Vue3 项目的基础配置
    'eslint:recommended', // 扩展了 ESLint 官方推荐的规则配置
    '@vue/eslint-config-typescript', // 扩展了与 TypeScript 一起使用的 Vue.js 配置
    '@vue/eslint-config-prettier' // 扩展了与 Prettier 一起使用的 Vue.js 配置
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    UniApp: true,
    UniHelper: true,
    Page: true,
    AnyObject: true
  },
  parserOptions: {
    ecmaVersion: 'latest' // 指定 ECMAScript 的版本为最新版本
  },
  rules: {
    // 与 Prettier 格式化工具集成的规则及其配置 https://github.com/prettier/eslint-plugin-prettier#options
    'prettier/prettier': [
      'warn', // 表示规则的级别为警告级别，如果违反规则，ESLint 将发出警告。此选项将合并并重写在 pretierrc 文件中的任何配置
      {
        singleQuote: true, // 使用单引号而非双引号来表示字符串
        semi: false, // 不在语句末尾添加分号
        printWidth: 100, // 限制每行代码的最大宽度为100
        trailingComma: 'none', // 不使用尾随逗号
        endOfLine: 'auto' // 根据操作系统自动选择换行符
      }
    ],
    'vue/multi-word-component-names': ['off'], // 不检查组件名是否为驼峰命名
    'vue/no-setup-props-destructure': ['off'], // 不检查 Vue 组件是否在设置阶段解构 props 对象
    'vue/no-deprecated-html-element-is': ['off'], // html 原生元素允许使用已弃用的 is 属性
    '@typescript-eslint/no-unused-vars': ['off'] // 对ts文件中声明但未使用的变量发出警告
  }
}
