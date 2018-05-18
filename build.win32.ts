import * as electronInstaller from "electron-winstaller";
import * as path from "path";

async function buildwin32() {
    return electronInstaller.createWindowsInstaller({
        appDirectory: path.join(__dirname, "temp/corgicherry-win32-x64"),
        outputDirectory: path.join(__dirname, "release/corgicherry-win32-x64"),
        authors: "wjt Inc.",
        exe: "corgicherry.exe",
    });
}

try {
    buildwin32();
} catch (err) {
    console.warn(err);
}
