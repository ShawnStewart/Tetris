const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

const webpackConfig = {
    mode: !isProd ? 'development' : 'production',
    entry: './Tetris/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
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
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './Tetris/public/index.html' }),
    ],
    resolve: {
        extensions: ['.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
};

if (!isProd) {
    webpackConfig.devtool = 'cheap-module-eval-source-map';
} else if (isProd) {
    webpackConfig.optimization.minimize = true;
    webpackConfig.optimization.minimizer = [new TerserPlugin()];
    webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = webpackConfig;
