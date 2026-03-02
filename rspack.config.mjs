import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  // Target modern browsers → smaller output (no async/await transpile, etc.)
  target: ["web", "es2020"],

  entry: { main: "./src/main.jsx" },

  output: {
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  // Enable tree-shaking optimizations
  performance: {
    hints: false, // Suppress size warnings (we know about Three.js)
  },

  experiments: {
    css: true,
  },

  module: {
    parser: {
      // Allow `import styles from './x.module.css'` (default-export pattern)
      "css/auto": { namedExports: false },
    },
    rules: [
      // ── JSX / JS via builtin SWC ──
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: { syntax: "ecmascript", jsx: true },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            },
          },
        ],
        type: "javascript/auto",
      },

      // ── CSS (auto-detects .module.css for CSS Modules) ──
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css/auto",
      },

      // ── Images ──
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },

      // ── Fonts ──
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },

      // ── Media (video / audio) ──
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
      },

      // ── JSON ──
      {
        test: /\.json$/,
        type: "json",
      },
    ],
  },

  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: true,
    }),

    // Copy public/ assets to output (models, textures, videos, favicons)
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: { ignore: ["**/index.html"] },
          noErrorOnMissing: true,
        },
      ],
    }),

    isDev && new RefreshPlugin(),

    new rspack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isDev ? "development" : "production",
      ),
    }),
  ].filter(Boolean),

  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      cacheGroups: {
        // React core  — loaded eagerly, shared by every route
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/,
          name: "react-vendor",
          priority: 30,
          reuseExistingChunk: true,
        },

        // Framer Motion — used on almost every page
        framer: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: "framer-vendor",
          priority: 20,
          reuseExistingChunk: true,
        },

        // Three.js + R3F + postprocessing — ONLY in async Dither chunk
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three|postprocessing)[\\/]/,
          name: "three-vendor",
          chunks: "async",
          priority: 15,
          reuseExistingChunk: true,
        },

        // Remaining vendor code
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },

    minimize: !isDev,
    // Scope hoisting (module concatenation) for smaller output
    concatenateModules: !isDev,
    usedExports: true,
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            drop_console: true,
            passes: 2,
            pure_getters: true,
            unsafe_comps: true,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
  },

  devServer: {
    port: 5173,
    hot: true,
    historyApiFallback: true,
    static: { directory: "./public" },
    // Mock /api/register (ported from former vite.config.js)
    setupMiddlewares(middlewares) {
      middlewares.unshift((req, res, next) => {
        if (req.method === "POST" && req.url === "/api/register") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const data = JSON.parse(body || "{}");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true, id: Date.now(), data }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false }));
            }
          });
          return;
        }
        next();
      });
      return middlewares;
    },
  },

  devtool: isDev ? "cheap-module-source-map" : false,
});
