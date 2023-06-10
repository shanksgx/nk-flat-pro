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
      webpackConfig.devtool = process.env.REACT_NODE_ENV === 'dev' ? 'eval-source-map' : 'nosources-source-map'
      paths.appBuild = 'build'
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: process.env.REACT_NODE_ENV === 'test' ? './' : '/'
      }
      if (process.env.REACT_NODE_ENV !== 'dev') {
        webpackConfig.plugins = webpackConfig.plugins.concat(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerHost: "127.0.0.1",
            analyzerPort: 8888,
            openAnalyzer: true, // 构建完打开浏览器
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),
          })
        )
      }
      return webpackConfig
    },
    plugins: [
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
