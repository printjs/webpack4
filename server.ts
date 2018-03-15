import Fastify from "fastify";
import webpack from "webpack";
const webpackDevMiddleware = require("webpack-dev-middleware");
import config from "./webpack.config";
const fastify = Fastify();
const compiler = webpack(config);

fastify.use(webpackDevMiddleware(compiler));

fastify.use(require("webpack-hot-middleware")(compiler))


fastify.listen(1000, "127.0.0.1", (err) => {
    if (err) throw err
    console.log(`server listening on 1000`);
});