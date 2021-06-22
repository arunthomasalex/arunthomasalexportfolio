const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
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