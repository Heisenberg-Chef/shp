const path = require('path');

module.exports = {
    entry: './src/main.js', // 入口文件路径
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录路径
        filename: 'ok.js', // 输出文件名
    },
    module: {
        rules: [
            // loader加载器配置规则
            {
                test: [/.css$/, /.less$/],  // 检测 css、less、sass等
                exclude: /node_modules/,
                use: [
                    // 执行顺序，从上到下
                    "style-loader", // 在js中奖css通过 style标签的形式添加到html文件中
                    "css-loader", // 将css资源编译成commonJS的模块到JS
                    "less-loader"
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // 解析文件时自动添加的扩展名
    },
    mode: 'development', // 构建模式（development、production等）
};
