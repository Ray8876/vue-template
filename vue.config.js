module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 8081,
        open: true,
        proxy: {
            '/dev': {
                target: `http://127.0.0.1:8080/`,
                changeOrigin: true,
                pathRewrite: {
                    '^/dev': ''
                }
            }
        }
    }
}

