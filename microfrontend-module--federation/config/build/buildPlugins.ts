import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';

    return [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        isDev && new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:5].css',
            chunkFilename: 'css/[name].[hash:5].css',
        }),
        isDev && new webpack.ProgressPlugin(), //show build progress by percentages (turn off for prod build, it makes build slowly)
    ].filter(Boolean)
}
