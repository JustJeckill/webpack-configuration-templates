import type {Configuration} from "webpack";
import webpack from 'webpack';

//plugins
import 'webpack-dev-server';

import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildWebpack} from "./config/build/buildWebpack";

const devServer: DevServerConfiguration = {};
const config: Configuration = { devServer };



export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    return buildWebpack();
};
