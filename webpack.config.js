const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const _ = require('lodash');
const configuration = require('./package.json');

const dependencies = configuration.dependencies;

const PRODUCTION = process.env.NODE_ENV === 'production';
const ROOT_PATH = path.resolve(__dirname, 'src', 'ui');
const FILE_NAME_PATTERN = PRODUCTION ? '[name].[hash].js' : '[name].bundle.js';

function generateConfig() {
    const config = {
        'modulesDirectories': 'node_modules'
    };
    config.entry = {
      'app': path.resolve(ROOT_PATH, 'index.js'),
      'vendor': _.keys(dependencies)
    };

    config.output = {
        'path': path.resolve(__dirname, 'build', 'ui'),
        'publicPath': PRODUCTION ? '/' : 'http://localhost:8080/',
        'filename': PRODUCTION ? '[name].[hash].js' : '[name].bundle.js',
        'chunkFilename': FILE_NAME_PATTERN
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

    if (!PRODUCTION) {
      config.module.loaders.push({
        test: /\.less/,
        loader: 'style!css!less'
      });
    } else {
      config.module.loaders.push({
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'less-loader')
      });
    }

    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        }),
        new HtmlWebpackPlugin({
            'template': path.resolve(ROOT_PATH, 'index.html'),
            'inject': 'body',
            'minify': false
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', FILE_NAME_PATTERN)
    ];

    if (PRODUCTION) {
      config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
      config.plugins.push(new webpack.optimize.DedupePlugin());
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        'comments': false
      }));
      config.plugins.push(new ExtractTextPlugin('styles.[hash].css'));
    }

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
