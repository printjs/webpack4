import * as webpack from "webpack";
import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const tsImportPluginFactory = require("ts-import-plugin");



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
    entry: process.env.NODE_ENV === "production" ? "./src/main.tsx" : [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true",
        "./src/main.tsx",
    ],
    target: "electron-renderer",
    mode: env(process.env.NODE_ENV),
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        compress: true,
        noInfo: false,
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin         
    },
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
                    { loader: "babel-loader" },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [tsImportPluginFactory({
                                    libraryName: "antd",
                                    libraryDirectory: "lib",
                                    style: "css",
                                })],
                            }),
                            compilerOptions: {
                                module: "es2015",
                            },
                        },
                    },
                ],
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
                                paths: "src/resources/styles",
                            },
                        },
                    ],
                }),
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@route": path.join(__dirname, "/src/route/"),
            "@views": path.join(__dirname, "/src/views/"),
            "@store": path.join(__dirname, "/src/store/"),
            "@components": path.join(__dirname, "/src/components"),
            "@utils": path.join(__dirname, "/src/utils"),
            "@main": path.join(__dirname, "/src/main_process"),
        },
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "dist"),
        // publicPath: "/",
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/config/template.html"),
        }),
        css,
        stylus,
    ],
};

export default webpackConfig;
