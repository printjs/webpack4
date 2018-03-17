import * as webpack from "webpack";
import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");



function env(global_env: any): "development" | "production" {
    return global_env ? global_env : "development";
}



const css = new ExtractTextPlugin({
    // allChunks: true,
    filename: "[id].[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
});

const stylus = new ExtractTextPlugin({
    // allChunks: true,
    filename: "[id].[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
});




const webpackConfig: webpack.Configuration = {
    entry: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
        "./src/main.ts",
    ],
    mode: env(process.env.NODE_ENV),
    // context: __dirname,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader",
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: css.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.styl$/,
                loader: stylus.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer],
                            },
                        },
                        {
                            loader: "stylus-loader",
                            options: {
                                sourceMap: true,
                                paths: "src/resources/",
                            },
                        },
                    ],
                }),
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "dist"),
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin(),
        css,
        stylus,
    ],
};

export default webpackConfig;
