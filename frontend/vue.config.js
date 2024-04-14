// const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '',
//         },
//       },
//     },
//   },
// }

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
