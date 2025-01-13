import path from 'path';
import webpack from'webpack';

//plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import 'webpack-dev-server';

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

const devServer: DevServerConfiguration = {};
const config: Configuration = { devServer };

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
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
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            isDev && new MiniCssExtractPlugin({
                filename: 'css/[name].[hash:5].css',
                chunkFilename: 'css/[name].[hash:5].css',
            }),
            isDev && new webpack.ProgressPlugin(), //show build progress by percentages (turn off for prod build, it makes build slowly)
        ].filter(Boolean),
        module: {
            rules: [
                // order matters
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isProd ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ], // replace style-loader to MiniCssExtractPlugin.loader if use plugin
                },
                {
                    // ts-loader can work with JSX
                    // if don't use ts-loader, we need to use babel
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? {
            port: env.port ?? 3000, // command with port example - npm run start --  --env port=5002
            open: true
        } : undefined,
        optimization: {
            runtimeChunk: 'single',
        },
    }
    return config;
};
