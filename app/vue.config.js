module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
                // 路径重写 -- 目前后台服务器路径中有API，因此我们不需要进行重写。
                // pathRewrite: { "^/api": "" },
            }
        }
    }
};

