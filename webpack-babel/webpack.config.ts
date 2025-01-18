import type {Configuration} from "webpack";
import webpack from 'webpack';

//plugins
import 'webpack-dev-server';

import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildPaths, EnvVariables} from "./config/build/types/types";
import path from "path";

const devServer: DevServerConfiguration = {};
const config: Configuration = { devServer };



export default (env: EnvVariables) => {
    const paths: BuildPaths =  {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths
    })

    return config;
};
