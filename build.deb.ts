const installer = require("electron-installer-debian");
import * as path from "path";

const options = {
    src: path.join(__dirname, "temp/corkycherry-linux-x64"),
    dest: path.join(__dirname, "release/corkycherry-linux-x64"),
    arch: "amd64",
};

console.log("Creating package (this may take a while)");

installer(options)
    .then(() => console.log(`Successfully created package at ${options.dest}`))
    .catch((err: any) => {
        console.error(err, err.stack);
        process.exit(1);
    });
