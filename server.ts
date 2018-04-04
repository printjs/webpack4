import Fastify from "fastify";
import webpack from "webpack";
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");
import config from "./webpack.config";
const fastify = Fastify();
const compiler = webpack(config);
import * as fs from "fs";
import * as path from "path";
const serveStatic = require("serve-static");



fastify.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
}));


// fastify.use("/", history());

// fastify.use("/", serveStatic(path.join(__dirname, "/dist")));

fastify.use(webpackDevMiddleware(compiler, {
    // publicPath: "/",
}));



// fastify.get("*", { logLevel: "warn" }, (request, reply) => {
//     compiler.outputFileSystem.readFile(path.join(__dirname, "/dist/index.html"), (err: Error, result: Buffer) => {
//         if (err) {
//             console.log(err);
//         }
//         reply.header("content-type", "text/html");
//         reply.send(result);
//     });
// });


fastify.listen(9999, (err) => {
    if (err) {
        throw err;
    }
    console.log(`server listening on 9999`);
});





