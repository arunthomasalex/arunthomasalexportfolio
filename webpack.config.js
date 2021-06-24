const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        App: './src/components/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, './server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
            { 
                test: /\.(scss|css)$/, 
                loader: 'ignore-loader' 
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}