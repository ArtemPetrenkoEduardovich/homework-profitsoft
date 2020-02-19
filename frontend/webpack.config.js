var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app/app.jsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, '../src/main/webapp'),     // путь к каталогу выходных файлов
        // publicPath: '/js/',
        filename: "js/bundle.js"       // название создаваемого файла
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [   //загрузчик для js
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]    // используемые плагины
                }
            },
            {
                // test: /\.css?$/,
                test: /\.less?$/,
                exclude: /(node_modules)/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    }
};

// npm i -D babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader

// require("babel-core/register");
// require("babel-polyfill");