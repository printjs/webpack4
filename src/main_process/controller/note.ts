import * as fs from "fs";
import { config } from "@main/share/config";
import * as path from "path";
import { Buffer } from "buffer";
import { zip } from "@main/controller/compress";
import { INoteType } from "@views/note/_catalog/redux";


function isString(x: any): x is string {
    return typeof x !== "undefined";
}

function isINoteType(x: any): x is INoteType {
    return typeof x !== "undefined";
}

class Utils {
    public async getAllNotes() {
        const files = await this.readDir().catch((err) => {
            console.warn(err);
        });
        const datas: any[] = [];
        // for (let i = 0, len = files.length; i < len; i++) {
        //     const fullname = files[i];
        //     const filename = fullname.replace(".zip", "");
        //     await zip.deCompress(filename);
        //     const context = await this.openNote("r", config.context);
        //     let attr = await this.openNote("r", config.attr);
        //     await this.delNote(config.context);
        //     await this.delNote(config.attr);
        //     if (isString(attr)) {
        //         attr = JSON.parse(attr);
        //         if (isINoteType(attr)) {
        //             datas.push({
        //                 title: attr.title,
        //                 context: context,
        //                 createtime: attr.createtime,
        //                 updatetime: attr.updatetime,
        //                 filetype: attr.filetype,
        //                 id: filename,
        //                 top: attr.top,
        //             });
        //         }
        //     }
        // }
        console.log(files);
        for (let filename of files) {
            let flag = true;
            await zip.deCompress(filename).catch((err) => {
                flag = false;
                console.warn(err);
            });
            if (!flag) {
                continue;
            }
            const context = await this.openNote("r", config.context);
            let attr = await this.openNote("r", config.attr);
            await this.delNote(config.context);
            await this.delNote(config.attr);
            if (isString(attr)) {
                attr = JSON.parse(attr);
                if (isINoteType(attr)) {
                    datas.push({
                        title: attr.title,
                        context: context,
                        createtime: attr.createtime,
                        updatetime: attr.updatetime,
                        filetype: attr.filetype,
                        id: filename,
                        status: attr.status,
                        top: attr.top,
                    });
                }
            }
        }
        return datas;
    }

    public async syncNote(arr: INoteType[]) {
        const files = await this.readDir().catch((err) => {
            console.warn(err);
        });
        for (let item of arr) {
            await zip.compress(item.id, item.context, JSON.stringify({
                title: item.title,
                createtime: item.createtime,
                updatetime: item.updatetime,
                filetype: item.filetype,
                status: item.status,
                top: item.top,
            }));
        }
    }

    public async delNote(filename: string) {
        return new Promise((resolve, reject) => {
            fs.unlink(path.join(config.path, filename), (err) => {
                try {
                    resolve(true);
                } catch (err) {
                    reject(err);
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

    public async create(id: string, context: string, attr: string) {
        return await zip.compress(id, context, attr);
    }

    public async openNote(operation: "r" | "w" | "a", filename: string, data?: string | Buffer, mode?: number) {
        return new Promise((resolve, reject) => {
            fs.open(path.join(config.path, filename), operation, async (err, fd) => {
                if (err) {
                    reject(err);
                    if (err.code === "ENOENT") {
                        console.error("myfile does not exist");
                    } else if (err.code === "EEXIST") {
                        console.error("myfile already exists");
                    } else if (err.code === "EISDIR") {
                        console.error("myfile is directory");
                    }
                } else {
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
                }
            });
        });
    }

    private async readMyData(fd: number) {
        return new Promise((resolve, reject) => {
            fs.readFile(fd, "utf8", async (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    private async writeMyData(fd: number, data: string | Buffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fd, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("The file has been saved!");
                }
            });
        });
    }


    private async readDir(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readdir(config.path, async (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    private async stat(path: string) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stat) => {
                if (err) {
                    reject(err);
                } else {
                    console.warn(stat);
                    resolve(stat);
                }
            });
        });
    }

}


export const noteUtils = new Utils();
