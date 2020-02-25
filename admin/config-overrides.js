/*
 * @Description: webpack配置文件
 * @Author: leo
 * @Date: 2019-09-16 20:07:06
 * @LastEditors: leo
 * @LastEditTime: 2019-09-19 13:53:51
 */
const { paths } = require("react-app-rewired")
const { override, fixBabelImports, addLessLoader, addWebpackAlias, overrideDevServer } = require('customize-cra')
const devServerConfig = () => config => {
  return {
      ...config,
      proxy: {
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api',
          },
          secure: false,
        }
      }
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
      modifyVars: { '@primary-color': '#1DA57A' }
    }),
    addWebpackAlias({
      '@assets': `${paths.appSrc}/assets/`
    })
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}
