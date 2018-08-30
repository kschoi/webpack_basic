const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'production',
    entry: {
        common: [
            './src/js/common.js'
        ],
        view: [
            './src/js/app.js'
        ],
        style: [
            './src/css/common.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: '[name].min.js'
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new LiveReloadPlugin(),
        new MiniCssExtractPlugin({
            // filename: devMode ? '[name].css' : '[name].[hash].css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
            filename: './../css/[name].min.css',
            chunkFilename: './../css/[id].min.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { 
                    presets: ['es2015'] 
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: './dist/img/[path][name].[ext]',
                            // outputPath: './img/'
                        }
                    }
                ]
            },
            // {
            //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 // Limit at 50k. Above that it emits separate files
            //                 limit: 50000,
            //                 // useRelativePath: process.env.NODE_ENV === "production",
            //                 name: './src/fonts/[name].[ext]'
            //                 // publicPath: devMode ? "http://localhost:3001/" : "/",
            //                 // outputPath: './../fonts/'
            //             }
            //         }
            //     ]
            // }
        ]
    },
    watch: true,
    stats: {
        colors: true
    }
};