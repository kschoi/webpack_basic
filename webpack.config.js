const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry : {
        'dist/script.js': './src/app.js',
        'dist/main.css~': './src/main.scss'
    },
    output : {
        path: __dirname+'/',
        filename: '[name]'
    },
    watch: true,
    devtool: 'eval-source-map',

    module: {
        loaders:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets:['es2015']
                }
            }
        ],

        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./dist/style.css'),
        new LiveReloadPlugin()
    ]


}