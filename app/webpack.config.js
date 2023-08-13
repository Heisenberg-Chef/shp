// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 其他的 Webpack 配置
    plugins: [
        new HtmlWebpackPlugin({
            title: "Heisenberg\'s ICE SHOP",
            // 其他选项
        }),
    ],
};
