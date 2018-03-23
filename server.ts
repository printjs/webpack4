import Fastify from "fastify";
import webpack from "webpack";
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");
import config from "./webpack.config";
const fastify = Fastify();
const compiler = webpack(config);
import * as fs from "fs";
import * as path from "path";



fastify.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
}));


fastify.use(history());

fastify.use(webpackDevMiddleware(compiler));


fastify.addHook("onResponse", (res: any, next: any) => {
    next();
});
// // 通常用于加载静态资源
// fastify.use(express.static(__dirname + "/dist"));

// // 在你应用 JavaScript 文件中包含了一个 script 标签
// // 的 index.html 中处理任何一个 route
// fastify.get("*", (request, response) => {
//     response.sendFile(path.join("/__webpack_hmr", "index.html"));
// });



fastify.listen(9999, (err) => {
    if (err) {
        throw err;

    }
    console.log(`server listening on 9999`);
});





