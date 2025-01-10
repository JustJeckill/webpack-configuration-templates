import path from 'path';

//plugins
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from'webpack';
import 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode
}

export default (env: EnvVariables) => {
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        // one entry point, use string
        entry: path.resolve(__dirname, 'src', 'index.ts'),
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
            filename: 'bundle.[fullhash:5].js', // 5 - how many digits in hash
            clean: true // if it's true we don't need to remove old build files by hands
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            new webpack.ProgressPlugin(), //show build progress by percentages (turn off for prod build, it makes build slowly)
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: {
            static: './dist',
        },
        optimization: {
            runtimeChunk: 'single',
        },
    }
    return config;
};
