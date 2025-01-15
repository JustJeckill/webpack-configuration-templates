import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    return {
        mode: options.mode ?? 'development',
        // one entry point, use string
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        // multiply entry point, use object and If an object is passed the value might be a string, array of strings, or a descriptor
        // entry: {
        //     home: './home.js',
        //     shared: ['react', 'react-dom', 'redux', 'react-redux'],
        //     catalog: {
        //         import: './catalog.js',
        //         filename: 'pages/catalog.js',
        //         dependOn: 'shared',
        //         chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
        //     },
        //     personal: {
        //         import: './personal.js',
        //         filename: 'pages/personal.js',
        //         dependOn: 'shared',
        //         chunkLoading: 'jsonp',
        //         asyncChunks: true, // Create async chunks that are loaded on demand.
        //         layer: 'name of layer', // set the layer for an entry point
        //     },
        // },
        //dynamic entry
        // entry: () => './demo',
        // entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[fullhash:5].js', // 5 - how many digits in hash
            chunkFilename: '[name].[fullhash: 5].js',
            clean: true // if it's true we don't need to remove old build files by hands
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: {
            runtimeChunk: 'single',
        },
    }
}
