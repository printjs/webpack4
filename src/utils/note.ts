import * as fs from "fs";
import { config } from "@utils/config";
import * as path from "path";

export class Utils {
    public async readFile() {
        fs.open("myfile", "r", (err, fd) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.error("myfile does not exist");
                    return;
                }

                throw err;
            }

            // readMyData(fd);
        });
    }


    public async writeFile() {
        return new Promise((resolve, reject) => {
            fs.open(path.join(config.noteCache, "/wjt.json"), "wx", (err, fd) => {
                if (err) {
                    if (err.code === "EEXIST") {
                        console.error("myfile already exists");
                        return;
                    }

                    throw err;
                }
                console.log(fd);
                resolve(fd);
                // writeMyData(fd);
            });
        });

    }
    // public exist() {

    // }
}
