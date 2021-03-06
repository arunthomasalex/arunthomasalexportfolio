const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        portfolio: './src/portfolio/index.js',
        resume: './src/resume/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new RemovePlugin({
            before: {
                root: "./public",
                test: [
                    {
                        folder: '.',
                        method: (absoluteItemPath) => {
                            return new RegExp(/(\.css\.map)|(\.css)$/, 'm').test(absoluteItemPath);
                        }
                    },
                    {
                        folder: '.',
                        method: (absoluteItemPath) => {
                            return new RegExp(/(\.js\.map)|(\.js)$/, 'm').test(absoluteItemPath);
                        },
                        recursive: true
                    }
                ]
            }
        })
    ]
}