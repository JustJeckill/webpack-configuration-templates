import {ModuleOptions} from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isProd = options.mode === 'production';

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
        ], // replace style-loader to MiniCssExtractPlugin.loader if use plugin
    };
    const tsLoader = {
        // ts-loader can work with JSX
        // if don't use ts-loader, we need to use babel
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [
        // order matters
        scssLoader,
        tsLoader
    ];
}
