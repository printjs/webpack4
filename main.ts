import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";


function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({ width: 800, height: 600 });

    // 然后加载应用的 index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/dist/index.html"),
        protocol: "file:",
        slashes: true,
    }));
}

app.on("ready", createWindow);
