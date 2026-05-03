import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    rules: {
      "no-console": "warn",
      eqeqeq: "warn",
      curly: "warn",
      "no-else-return": "warn",
      "vue/multi-word-component-names": "off",
    },
  },

  prettier,
);
