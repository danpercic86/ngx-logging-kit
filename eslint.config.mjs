import eslint from "@eslint/js";
import angular from "angular-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        files: ["**/*.ts"],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            "@angular-eslint/component-class-suffix": [
                "error",
                {
                    suffixes: ["Page", "Component", "Modal"],
                },
            ],
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
            "@typescript-eslint/explicit-member-accessibility": [
                "error",
                {
                    accessibility: "no-public",
                },
            ],
            "@typescript-eslint/explicit-function-return-type": [
                "error",
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: false,
                    allowDirectConstAssertionInArrowFunctions: true,
                    allowIIFEs: true,
                },
            ],
            "@typescript-eslint/no-confusing-void-expression": "off",
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/no-misused-promises": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "arrow-body-style": "error",
            "arrow-parens": ["error", "as-needed"],
        },
    },
    {
        files: ["**/*.html"],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
    {
        files: ["**/*.spec.ts"],
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/unbound-method": "off",
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    eslintConfigPrettier,
);
