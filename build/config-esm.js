'use strict';

const webpack = require('webpack');
const path = require('path');
const json = require('../package.json');
const moment = require('moment');
const TerserPlugin = require("terser-webpack-plugin");

/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const devMode = process.env.NODE_ENV !== 'production';

const webpackConfig = {
	devtool: devMode ? 'source-map' : false,
    mode: devMode === 'development' ? 'development' : 'production',
	watch: false,
    resolve: {
        fallback: {
            fs: false
        },
        extensions: ['.js','.ts']
    },

    entry: {
		'boot-helpers': path.resolve(__dirname, '../src/index.ts'),
		'boot-helpers.min': path.resolve(__dirname, '../src/index.ts')
    },

    experiments: {
        outputModule: true,
    },
    output: {
        library: {
            // do not specify a `name` here
            type: 'module',
        },
		filename: '[name].esm.js',
		path: path.resolve(__dirname, '../dist'),
	},

	optimization: {
		minimize: true,
	    minimizer: [

			new TerserPlugin({
				test: /\.min\.js$/i
			}),
		],
		
	},
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '../node_modules' ),
                options: {  
					'presets': [
						["@babel/preset-env", {
							"targets": { "esmodules": true }
						}],
						'@babel/preset-typescript'
					]
                }
			},
        ],
		
    },
	plugins: []
	
	
};

// Add souce maps
webpackConfig.plugins.push(
	new webpack.SourceMapDevToolPlugin({
	  filename: '../dist/[file].map',
	})
);

// Adds a banner to the top of each generated chunk.
webpackConfig.plugins.push(
    new webpack.BannerPlugin(`
	Boot Helpers

	@source: https://github.com/xizon/boot-helpers
	@version: ${json.version} (${moment().format( "MMMM D, YYYY" )})
	@author: UIUX Lab <uiuxlab@gmail.com>
	@license: MIT
	`)
);

									
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;


