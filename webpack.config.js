const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    //entry: path.resolve(__dirname, './src/vendors-js/createjs.min.js'),
    mode: 'production',
    module: {
        rules: [
           /*  {
                test: /\.vendors-js\/.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, */
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.vendors-css\/.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
};
