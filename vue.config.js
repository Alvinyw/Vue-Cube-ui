const path = require('path')

function resolve(dir) {
  path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  outputDir: 'testDemo',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://192.168.188.46:8081/',
        changeOrigin: true, // 允许跨域
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      /* 全局scss */
      sass: {
        prependData: '@import "./src/assets/scss/variables.scss";'
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    name: "Vue Cube-ui",
    resolve: {
      alias: {
        '@': resolve('src'),
        images: '@/assets/images',
        components: '@/components',
        views: '@/views'
      }
    }
  }
}