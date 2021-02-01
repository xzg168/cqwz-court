module.exports = {
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
  devServer: {
    compress: true, // 是否启用gzip压缩
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      ["/api"]: {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ["^/pai"]: ""
        }
      }
    },
    disableHostCheck: true
  }
};
