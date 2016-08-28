const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const _ = require('lodash');

const PRODUCTION = process.env.NODE_ENV === 'production';
const ROOT_PATH = path.resolve(__dirname, 'src', 'ui');
const FILE_NAME_PATTERN = PRODUCTION ? '[name].[chunkhash].js' : '[name].bundle.js';

function generateConfig() {
    const config = {
        'modulesDirectories': 'node_modules'
    };

    config.resolve = {
      extensions: ['', '.js', '.less']
    };

    config.entry = {
      'app': path.resolve(ROOT_PATH, 'index.js'),
      'vendor': [
        'react',
        'react-dom',
        'react-tap-event-plugin',
        'redux-thunk',
        'spring-data-rest-js',
        'material-ui/styles/MuiThemeProvider'
      ]
    };

    config.output = {
        'path': path.resolve(__dirname, 'build', 'ui'),
        'publicPath': PRODUCTION ? '/' : 'http://localhost:8080/',
        'filename': FILE_NAME_PATTERN,
        'chunkFilename': FILE_NAME_PATTERN
    };

    config.devtool = PRODUCTION ? '#source-map' : 'cheap-module-eval-source-map';

    config.module = {
        loaders: [{
            'test': /\.js$/,
            'loader': 'babel',
            'exclude': /node_modules/
        },
        {
          'test': /\.html$/,
          'loader': 'html'
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
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            'template': path.resolve(ROOT_PATH, 'index.html'),
            'inject': 'body',
            'minify': PRODUCTION ? false : {}
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', FILE_NAME_PATTERN),
        new webpack.optimize.DedupePlugin()
    ];

    if (PRODUCTION) {
      config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        'comments': false
      }));
      config.plugins.push(new ExtractTextPlugin('styles.[hash].css'));
      config.plugins.push(new WebpackMd5Hash());
    } else {
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    config.devServer = {
        'contentBase': path.resolve(__dirname, 'build', 'ui'),
        'historyApiFallback': true,
        'progress': true,
        'hot': true,
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
