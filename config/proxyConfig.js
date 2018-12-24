module.exports = {
  proxyList: {
    '/proxyapi/': {
      target: 'https://www.zxpaas.com/daas/',
      changeOrigin: true,
      secure:true,
      pathRewrite: {
        '^/proxyapi': ''
      }
    },
    '/proxyapiwaas/': {
      target: 'https://www.zxpaas.com/waas/',
      changeOrigin: true,
      secure:true,
      pathRewrite: {
        '^/proxyapiwaas': ''
      }
    },
    '/proxyapiAuthen/': { //认证中心
      target: 'https://www.zxpaas.com/authen/',
      changeOrigin: true,
      secure:false,
      pathRewrite: {
          '^/proxyapiAuthen': ''
      }
    }
   ,
    '/proxyapiMsg/': {
      target: 'https://www.zxpaas.com/msg/',
      changeOrigin: true,
      secure:true,
      pathRewrite: {
          '^/proxyapiMsg': ''
      }
    },
      '/proxyapiFaas/': {//文件服务
          target: 'https://www.zxpaas.com/faas/',
          changeOrigin: true,
          secure:true,
          pathRewrite: {
              '^/proxyapiFaas': ''
          }
      },
      '/baidumapapi/': {
          target: 'http://api.map.baidu.com',
          changeOrigin: true,
          secure:true,
          pathRewrite: {
              '^/baidumapapi': ''
          }
      },
      '/proxyapiUeditor/': {
          target: 'http://192.168.0.202:8085/ueditor/',
          changeOrigin: true,
          secure:false,
          pathRewrite: {
              '^/proxyapiUeditor': ''
          }
      },
      '/proxyapiBusiness/': {
          target: 'http://localhost:7900/business/',
          changeOrigin: true,
          secure:false,
          ws: true,
          pathRewrite: {
              '^/proxyapiBusiness': ''
          }
      },
      '/proxyapiSyncdata/': {
          target: 'http://localhost:7900/business/',
          changeOrigin: true,
          secure:false,
          ws: true,
          pathRewrite: {
              '^/proxyapiBusiness': ''
          }
      }
    }
}
