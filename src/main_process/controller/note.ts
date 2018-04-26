import * as fs from "fs";
import { config } from "@main/share/config";
import * as path from "path";
import { Buffer } from "buffer";

class Utils {
    public async getAllNotes() {
        return new Promise((resolve, reject) => {
            fs.readdir(config.noteFiles, async (err, files) => {
                try {
                    const datas = await Promise.all(files.map(async (filename, $index) => {
                        return await this.openNote("r", filename) || "";
                    }));
                    const temp1: any = datas.filter((data) => data !== "");
                    const result = temp1.map((item: string, $index: number) => {
                        try {
                            return JSON.parse(item);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    public async delNote(path: string) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    }

    public async rename(old: string, newName: string) {
        return new Promise((resolve, reject) => {
            fs.rename(old, newName, (err) => {
                if (err) {
                    throw err;
                }
            });
        });

    }

    public async openNote(operation: "r" | "w" | "a", filename: string, data?: string | Buffer, mode?: number) {
        return new Promise((resolve, reject) => {
            fs.open(path.join(config.noteFiles, filename), operation, async (err, fd) => {
                try {
                    switch (operation) {
                        case "r":
                            resolve(await this.readMyData(fd));
                            break;
                        case "w":
                            resolve(await this.writeMyData(fd, data || ""));
                            break;
                        case "a":
                            resolve(await this.writeMyData(fd, data || ""));
                            break;
                        default:
                            break;
                    }
                    fs.closeSync(fd);
                } catch (err) {
                    reject(err);
                    if (err.code === "ENOENT") {
                        console.error("myfile does not exist");
                    } else if (err.code === "EEXIST") {
                        console.error("myfile already exists");
                    } else if (err.code === "EISDIR") {
                        console.error("myfile is directory");
                    }
                }
            });
        });
    }

    private async readMyData(fd: number) {
        return new Promise((resolve, reject) => {
            fs.readFile(fd, "utf8", async (err, data) => {
                try {
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }


    private async writeMyData(fd: number, data: string | Buffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fd, JSON.stringify(data), (err) => {
                try {
                    resolve("The file has been saved!");
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}


export const noteUtils = new Utils();




// async function test() {
//     await noteUtils.getAllNotes(path.join(__dirname, "../../../files"));
//     await noteUtils.openNote("w", Buffer.from("dsfjklsadjfkasdfjkasjdfasjldf"));
//     await noteUtils.openNote("r", "");
// }

// test().catch((err: string) => {
//     console.warn(err);
// });
