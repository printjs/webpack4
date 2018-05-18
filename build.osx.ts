const createDMG = require("electron-installer-dmg");
import * as path from "path";

function builddmg() {
        createDMG({
            appPath: path.join(__dirname, "temp/corkycherry-darwin-x64"),
            name: "corkycherry",
            // out: path.join(__dirname, "release/corkycherry-mas-x64"),
            // overwrite: true,
            format: "UDZO",
        }, (err: any) => {
            if (err) {
                console.dir(err);
            }
        });
}


builddmg();

