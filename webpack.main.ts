"use strict";

import * as path from "path";
const { dependencies } = require("./package.json");
import * as webpack from "webpack";


function env(global_env: any): "development" | "production" {
    return global_env ? global_env : "development";
}

const mainConfig: webpack.Configuration = {
    entry: {
        main: path.join(__dirname, "./main.ts"),
    },
    externals: [
        ...Object.keys(dependencies || {}),
    ],
    mode: env(process.env.NODE_ENV),
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
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    node: {
        __dirname: process.env.NODE_ENV !== "production",
        __filename: process.env.NODE_ENV !== "production",
    },
    output: {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: path.join(__dirname, "./dist"),
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    target: "electron-main",
};


export default mainConfig;
