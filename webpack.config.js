const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const ROOT_PATH = path.resolve(__dirname, 'src', 'ui');

function generateConfig() {
    const config = {
        'modulesDirectories': 'node_modules'
    };
    config.entry = path.resolve(ROOT_PATH, 'index.js');

    config.output = {
        'path': path.resolve(__dirname, 'build', 'ui'),
        'publicPath': PRODUCTION ? '/' : 'http://localhost:8080/',
        'filename': PRODUCTION ? '[name].[hash].js' : '[name].bundle.js',
        'chunkFilename': PRODUCTION ? '[name].[hash].js' : '[name].bundle.js'
    };

    config.devtool = PRODUCTION ? '#source-map' : 'cheap-module-eval-source-map';

    config.module = {
        loaders: [{
            'test': /\.js$/,
            'loader': 'babel',
            'exclude': /node_modules/,
            'query': {
                'presets': ['es2015', 'react', 'stage-2']
            }
        }]
    };

    const lessLoader = {
      test: /\.less/,
      loader: 'style!css!less'
    };

    config.module.loaders.push(lessLoader);

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        }),
        new HtmlWebpackPlugin({
            'template': path.resolve(ROOT_PATH, 'index.html'),
            'inject': 'body',
            'minify': PRODUCTION
        })
    ];

    config.devServer = {
        'contentBase': path.resolve(__dirname, 'build', 'ui'),
        'historyApiFallback': true,
        'progress': true,
        'stats': {
            'modules': false,
            'cached': false,
            'colors': true,
            'chunk': false
        }
    };

    return config;
}

module.exports = generateConfig();
