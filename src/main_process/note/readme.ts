import * as fs from "fs";
import * as path from "path";

export async function readme(url: string): Promise<any> {
    return new Promise((reslove, reject) => {
        fs.open(path.join(process.cwd(), "config/note.readme.md"), "r", (err, fd) => {
            if (err) {
                reject(err);
            } else {
                fs.readFile(fd, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        reslove(Buffer.from(data).toString("utf8"));
                    }
                    fs.closeSync(fd);
                });
            }
        });
    });
}
