import * as fs from "fs";
import { config } from "@main/share/config";
import * as path from "path";

export class Utils {
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

    public async openNote(operation: "r" | "w" | "a", data: string, mode?: number) {
        return new Promise((resolve, reject) => {
            fs.open("myfile", operation, async (err, fd) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        console.error("myfile does not exist");
                        return;
                    } else if (err.code === "EEXIST") {
                        console.error("myfile already exists");
                        return;
                    }
                    throw err;
                }
                switch (operation) {
                    case "r":
                        resolve(await this.readMyData(fd));
                        break;
                    case "w":
                        resolve(await this.writeMyData(fd, data));
                        break;
                    case "a":
                        resolve(await this.writeMyData(fd, data));
                        break;
                    default:
                        break;
                }
            });
        });
    }

    private async readMyData(fd: number) {
        return new Promise((resolve, reject) => {
            fs.readFile(fd, "utf8", async (err, data) => {
                if (err) {
                    throw err;
                }
                resolve(data);
            });
        });
    }


    private async writeMyData(fd: number, data: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fd, data, (err) => {
                if (err) {
                    throw err;
                }
                resolve("The file has been saved!");
            });
        });
    }
}
