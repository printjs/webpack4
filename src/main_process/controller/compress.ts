// require modules
import * as fs from "fs";
import archiver from "archiver";
import { config } from "@main/share/config";
import * as path from "path";
import extract from "extract-zip";


class Zip {
    public async compress(id: string, context: string, attr: string) {
        return new Promise((resolve, reject) => {
            // create a file to stream archive data to.
            // let output = fs.createWriteStream(path.join(config.path, `${id}.zip`));
            let output = fs.createWriteStream(path.join(config.path, id));
            let archive = archiver("zip", {
                zlib: { level: 9 }, // Sets the compression level.
            });

            // listen for all archive data to be written
            // "close" event is fired only when a file descriptor is involved
            output.on("close", () => {
                resolve(true);
                console.log(archive.pointer() + " total bytes");
                console.log("archiver has been finalized and the output file descriptor has closed.");
            });

            // This event is fired when the data source is drained no matter what was the data source.
            // It is not part of this library but rather from the NodeJS Stream API.
            // @see: https://nodejs.org/api/stream.html#stream_event_end
            output.on("end", () => {
                console.log("Data has been drained");
            });

            // good practice to catch warnings (ie stat failures and other non-blocking errors)
            archive.on("warning", (err) => {
                reject(err);
                if (err.code === "ENOENT") {
                    // log warning
                } else {
                    // throw error
                    throw err;
                }
            });

            // good practice to catch this error explicitly
            archive.on("error", (err) => {
                throw err;
            });

            // pipe archive data to the file
            archive.pipe(output);

            // append a file from stream
            // let file1 = __dirname + "/file1.txt";
            // archive.append(fs.createReadStream(file1), { name: "file1.txt" });

            // append a file from string
            archive.append(context, { name: config.context });
            archive.append(attr, { name: config.attr });

            // append a file from buffer
            // let buffer3 = Buffer.from("buff it!");
            // archive.append(buffer3, { name: "file3.txt" });

            // append a file
            // archive.file("file1.txt", { name: "file4.txt" });

            // append files from a sub-directory and naming it `new-subdir` within the archive
            // archive.directory("subdir/", "new-subdir");

            // append files from a sub-directory, putting its contents at the root of archive
            // archive.directory("subdir/", false);

            // append files from a glob pattern
            // archive.glob("subdir/*.txt");

            // finalize the archive (ie we are done appending files but streams have to finish yet)
            // "close", "end" or "finish" may be fired right after calling this method so register to them beforehand
            archive.finalize();
        });
    }


    public deCompress(id: string) {
        return new Promise((resolve, reject) => {
            try {
                extract(path.join(config.path, id), {
                    dir: config.path,
                }, async (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                console.warn(error, path.join(config.path, id));
                reject(error);
            }

        });

        // 
        // console.log(unzip);
        // fs.createReadStream(path.join(config.path, id)).pipe(unzip.Extract({ path: config.path }));
    }
}


export const zip = new Zip();
// const unzip = zlib.createUnzip();

// unzip
