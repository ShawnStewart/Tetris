const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './Tetris/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './Tetris/public/index.html' }),
    ],
    resolve: {
        extensions: ['.js'],
    },
};
