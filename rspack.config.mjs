import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  target: ["web", "es2020"],

  entry: { main: "./src/main.jsx" },

  output: {
    filename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: isDev ? "[name].js" : "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },

  performance: {
    hints: false,
  },

  experiments: {
    css: true,
    // Defer compilation of async chunks until first request — speeds up dev cold start
    ...(isDev && { lazyCompilation: true }),
  },

  module: {
    parser: {
      "css/auto": { namedExports: false },
      javascript: {
        dynamicImportMode: "lazy",
      },
    },
    rules: [
      // JSX / JS
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: { syntax: "ecmascript", jsx: true },
                target: "es2020",
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
                // NOTE: loader-level minify is intentionally omitted here.
                // SwcJsMinimizerRspackPlugin handles all minification in the
                // optimization phase, which is faster (single pass, no duplication).
              },
            },
          },
        ],
        type: "javascript/auto",
      },

      // CSS
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css/auto",
      },

      // Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 4 * 1024 } },
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash:8][ext]",
        },
      },

      // Media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
      },

      // JSON
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
      // Minify HTML
      minify: !isDev,
    }),

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
    // Stable IDs for long-term caching (content-addressed, not numeric)
    moduleIds: "deterministic",
    chunkIds: "deterministic",

    // Enhanced tree-shaking
    providedExports: true,
    usedExports: true,
    innerGraph: true,
    sideEffects: true,

    // Mangle export names in production for additional byte savings
    mangleExports: !isDev,

    // Remove chunks that end up empty after tree-shaking
    removeEmptyChunks: true,

    concatenateModules: !isDev,
    minimize: !isDev,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 15,
      minSize: 10 * 1024,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/,
          name: "react-vendor",
          priority: 30,
          reuseExistingChunk: true,
        },

        framer: {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: "framer-vendor",
          priority: 20,
          reuseExistingChunk: true,
        },

        lenis: {
          test: /[\\/]node_modules[\\/]lenis[\\/]/,
          name: "lenis-vendor",
          priority: 18,
          reuseExistingChunk: true,
        },

        three: {
          test: /[\\/]node_modules[\\/](three|@react-three|postprocessing)[\\/]/,
          name: "three-vendor",
          chunks: "async",
          priority: 15,
          reuseExistingChunk: true,
        },

        fonts: {
          test: /[\\/]node_modules[\\/]@fontsource[\\/]/,
          name: "fonts",
          priority: 25,
          reuseExistingChunk: true,
        },

        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },

    runtimeChunk: "single",

    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            drop_console: true,
            passes: 3,
            pure_getters: true,
            unsafe_comps: true,
            dead_code: true,
            collapse_vars: true,
            reduce_vars: true,
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
