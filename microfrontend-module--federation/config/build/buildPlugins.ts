import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const {mode, paths} = options;
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css',
            chunkFilename: 'css/[name].[hash:5].css',
        }));
    }

    return plugins;
}
