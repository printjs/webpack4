import * as fs from "fs";
import * as path from "path";
// fs.rmdirSync(path.join(__dirname, "../dist"));
// fs.unlinkSync(path.join(__dirname, "../dist"));



function rm_rf(uri: string) {
    let files = [];
    if (fs.existsSync(uri)) {
        files = fs.readdirSync(uri);
        files.forEach((file, index) => {
            const curPath = uri + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse  
                rm_rf(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(uri);
    }
}


rm_rf(path.join(__dirname, "../dist"));
