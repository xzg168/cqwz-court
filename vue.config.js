module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "././" : "/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "重庆万州法院";
      return args;
    });
  },
  // 关闭生产环境console
  configureWebpack(config) {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1ABC9C",
          "link-color": "#1ABC9C"
        },
        javascriptEnabled: true
      }
    }
  },
  pwa: {
    iconPaths: {
      faviconSVG: "favicon.ico",
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  devServer: {
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      ["/api"]: {
        target: `http://localhost:8088`,
        changeOrigin: true,
        pathRewrite: {
          ["^/api"]: ""
        }
      }
    },
    disableHostCheck: true
  }
};
