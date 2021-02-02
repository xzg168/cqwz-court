module.exports = {
  configureWebpack: config => {
    return {
      title: "重庆万州法院"
    };
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
  devServer: {
    compress: true, // 是否启用gzip压缩
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      ["/api"]: {
        target: `https://mockapi.eolinker.com/MdNERTV6a93526922e0ab9a08284ab81c78abe2f65ec475`,
        changeOrigin: true,
        pathRewrite: {
          ["^/pai"]: ""
        }
      }
    },
    disableHostCheck: true
  }
};
