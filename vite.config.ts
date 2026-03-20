import { defineConfig } from "vite-plus";

export default defineConfig({
  root: ".",
  base: "/",

  build: {
    target: "es2020",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "framer-vendor";
            }
            if (id.includes("three") || id.includes("@react-three")) {
              return "three-vendor";
            }
            if (id.includes("@fontsource")) {
              return "fonts-vendor";
            }
          }
        },
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
      },
    },
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  server: {
    port: 5173,
  },

  css: {
    postcss: "./postcss.config.js",
  },

  assetsInclude: ["**/*.woff2", "**/*.woff", "**/*.eot", "**/*.ttf", "**/*.otf"],

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lenis",
      "three",
      "@react-three/fiber",
    ],
  },

  lint: {
    plugins: ["oxc", "typescript", "unicorn", "react"],
    categories: {
      correctness: "warn",
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ["dist"],
    rules: {
      "constructor-super": "error",
      "for-direction": "error",
      "getter-return": "error",
      "no-async-promise-executor": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-constant-binary-expression": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-empty-static-block": "error",
      "no-ex-assign": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-import-assign": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-loss-of-precision": "error",
      "no-misleading-character-class": "error",
      "no-new-native-nonconstructor": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-obj-calls": "error",
      "no-prototype-builtins": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-setter-return": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-undef": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "no-unused-vars": "error",
      "no-useless-backreference": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-with": "error",
      "require-yield": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      "react/display-name": "error",
      "react/jsx-key": "error",
      "react/jsx-no-comment-textnodes": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-undef": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/no-unsafe": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-render-return": "error",
    },
    overrides: [
      {
        files: ["*.config.{js,mjs,cjs}", "*.setup.{js,mjs,cjs}"],
        env: { es2022: true, node: true },
      },
      {
        files: ["**/*.{js,jsx}"],
        rules: {
          "react-hooks/rules-of-hooks": "error",
          "react-hooks/exhaustive-deps": "warn",
          "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
          "react/no-unknown-property": [
            "error",
            {
              ignore: [
                "args",
                "attach",
                "object",
                "dispose",
                "geometry",
                "material",
                "position",
                "rotation",
                "scale",
                "castShadow",
                "receiveShadow",
                "intensity",
                "fragmentShader",
                "vertexShader",
                "uniforms",
                "side",
                "transparent",
                "opacity",
                "wireframe",
                "depthWrite",
              ],
            },
          ],
          "react/only-export-components": ["warn", { allowConstantExport: true }],
        },
        globals: {
          AudioWorkletGlobalScope: "readonly",
          AudioWorkletProcessor: "readonly",
          currentFrame: "readonly",
          currentTime: "readonly",
          registerProcessor: "readonly",
          sampleRate: "readonly",
          WorkletGlobalScope: "readonly",
        },
        env: { es2022: true, browser: true },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
