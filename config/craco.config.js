/* craco.config.js */
const setting = require('../src/setting/webpackSetting.json')
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, `../${dir}`)
const CracoLessPlugin = require('craco-less')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const WebpackBar = require('webpackbar')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 200000,
        cacheGroups: {
          defaultVendors: {
            test: /[\/]node_modules[\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    configure: (webpackConfig, { paths }) => {
      paths.appBuild = 'build'
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: process.env.REACT_NODE_ENV === 'test' ? './' : '/'
      }
      return webpackConfig
    },
    plugins: [
      new BundleAnalyzerPlugin(),  // 使用默认配置
      new WebpackBar({ profile: true }),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd()
      }),
      // 查看打包的进度
      new SimpleProgressWebpackPlugin()
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'arcoblue-6': setting.primary
              // 'prefix': 'gloden',
            },
            javascriptEnabled: true
            //配置全局less 变量，不需要在使用的地方导入了
            // globalVars: {
            //   hack: `true; @import '@arco-design/web-react/dist/css/arco.css';`
            // }
          }
        }
      }
    }
  ],
  devServer: {
    port: 8000,
    proxy: {
      '/api-kernel-portal': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        secure: false,
        xfwd: false
      }
    }
  }
}
