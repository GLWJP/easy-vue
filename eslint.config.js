import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 针对所有 JavaScript, TypeScript, Vue 文件的配置
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"], // 匹配所有 JavaScript、TypeScript 和 Vue 文件
  },

  // 针对所有文件配置浏览器环境的全局变量
  {
    languageOptions: {
      globals: globals.browser, // 定义浏览器环境中的全局变量（如 `window`, `document` 等）
    },
  },

  // 引入并应用 ESLint JS 插件的推荐规则
  pluginJs.configs.recommended, // 使用 `@eslint/js` 插件提供的 JS 推荐规则配置

  // 引入并应用 TypeScript ESLint 插件的推荐规则
  ...tseslint.configs.recommended, // 使用 `@typescript-eslint/eslint-plugin` 提供的 TypeScript 推荐规则配置

  // 引入并应用 Vue ESLint 插件的推荐规则
  ...pluginVue.configs["flat/recommended"],

  {
    rules: {
      "vue/singleline-html-element-content-newline": "off"
    }
  },

  // 针对 Vue 文件的特殊配置
  {
    files: ["**/*.vue"], // 只针对 `.vue` 文件进行配置
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser, // 使用 TypeScript 解析器来解析 Vue 文件中的 TypeScript 代码
      },
    },
  },
]
