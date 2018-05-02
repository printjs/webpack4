import * as electronInstaller from "electron-winstaller";
import * as path from "path";

async function buildwin32() {
    return electronInstaller.createWindowsInstaller({
        appDirectory: path.join(__dirname, "temp/corkycherry-win32-x64"),
        outputDirectory: path.join(__dirname, "release/corkycherry-win32-x64"),
        authors: "wjt Inc.",
        exe: "corkycherry.exe",
    });
}

try {
    buildwin32();
} catch (err) {
    console.warn(err);
}
