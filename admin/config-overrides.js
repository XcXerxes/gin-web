/*
 * @Description: webpack配置文件
 * @Author: leo
 * @Date: 2019-09-16 20:07:06
 * @LastEditors: leo
 * @LastEditTime: 2020-02-26 15:39:03
 */
const { paths } = require('react-app-rewired')
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
  useEslintRc
} = require('customize-cra')
const devServerConfig = () => config => {
  return {
    ...config,
    port: 8989
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:7001',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/api'
    //     },
    //     secure: false
    //   }
    // }
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    addLessLoader({
      javascriptEnabled: true,
      localIdentName: '[local]--[hash:base64:5]',
      modifyVars: { '@primary-color': '#1DA57A' }
    }),
    addWebpackAlias({
      '@assets': `${paths.appSrc}/assets/`
    })
  )
  // devServer: overrideDevServer(devServerConfig())
}
