import * as webpack from "webpack";
import * as path from "path";


const webpackConfig: webpack.Configuration = {
    entry: "./src/main.ts",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, "dist"),
        publicPath: '/'
    },
    devtool: "source-map",
    plugins: [
        // OccurenceOrderPlugin is needed for webpack 1.x only
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Use NoErrorsPlugin for webpack 1.x
        // new webpack.NoEmitOnErrorsPlugin()
    ]
};

export default webpackConfig;