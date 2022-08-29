const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 代理服务器
  // devServer: {
  //   proxy: 'http://localhost:8000'
  // },

  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 注意直接指向目标服务器
        // pathRewrite:{'^/test':''}, // 路径重写
        ws: true, // 用于支持websocket
        changeOrigin: true // 用于控制请求头中的host
      }
    }
  }


})
