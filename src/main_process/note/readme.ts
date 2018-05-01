import * as fs from "fs";
import * as path from "path";

export async function readme(url: string): Promise<any> {
    return new Promise((reslove, reject) => {
        let url: string = process.env.NODE_ENV === "development" ? 
            path.join(process.cwd(), "config/note.readme.md") : path.join(__dirname, "note.readme.md");
        fs.open(url, "r", (err, fd) => {
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
