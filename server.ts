import Fastify from "fastify";
import webpack from "webpack";
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require("connect-history-api-fallback");
import config from "./webpack.config";
const fastify = Fastify();
const compiler = webpack(config);


fastify.use(webpackDevMiddleware(compiler, {
    publicPath: "/",
}));

fastify.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
}));


fastify.use("/", history());


fastify.listen(9999, "127.0.0.1", (err) => {
    if (err) {
        throw err;
    }
    console.log(`server listening on 9999`);
});
