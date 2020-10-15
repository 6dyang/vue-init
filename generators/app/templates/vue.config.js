/*
 * Copyright © 2020-present LiuDanYang. All rights Reserved.
 */

"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const openInEditor = require("launch-editor-middleware");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "项目初始化"; // 页面标题
// 如果您的端口设置为 80,
// 使用管理员特权执行命令行。
// 例如，Mac：sudo npm run
const port = 9527; // 开发端口

// 全部配置文档 https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before(app) {
      app.use("/__open-in-editor", openInEditor(["code", "phpstorm"]));
    },
    proxy: {
      // xxx-api/login => mock/login
      // 文档: https://cli.vuejs.org/zh/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `https://cdebug.zhixingonline.com`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  configureWebpack: {
    //在webpack的名称字段中提供应用程序的标题，以便
    //可以在index.html中对其进行访问以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        "@i": resolve("src/api"),
        "@c": resolve("src/components"),
        "@a": resolve("src/assets"),
        "@s": resolve("src/styles"),
        "@u": resolve("src/utils"),
        "@v": resolve("src/views")
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // 设置preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // 其他环境
    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime`必须与runtimeChunk名称相同。 默认是“运行时”
            inline: /runtime\..*\.js$/
          }
        ])
        .end();

      config
        .plugin("WebpackParallelUglifyPlugin")
        .use("webpack-parallel-uglify-plugin", [
          {
            uglifyJS: {
              output: {
                beautify: false, //是否需要格式化
                comments: false //是否保留代码中的注释，默认为保留
              },
              warnings: true, //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为false
              compress: {
                drop_console: true, //是否删除代码中所有的console语句，默认为false
                collapse_vars: true, //是否内嵌虽然已经定义了，但是只用到一次的变量， 默认值false
                reduce_vars: true //是否提取出现了多次但是没有定义成变量去引用的静态值，默认为false
              }
            },
            cacheDir: "node_modules/.cache/",
            sourceMap: false
          }
        ]);

      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // 仅打包最初依赖的第三方
          },
          elementUI: {
            name: "chunk-elementUI", // 将elementUI拆分为一个包
            priority: 20, // 重量需要大于libs和app，否则将打包到libs或app中
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // 可以自定义您的规则
            minChunks: 3, // 最小共同数
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
