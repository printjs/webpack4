import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { Dispatch } from "@main/dispatch";


function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({ width: 800, height: 600 });

    // 然后加载应用的 index.html。
    const prod: url.UrlObject = {
        pathname: path.join(__dirname, "/index.html"),
        protocol: "file:",
        slashes: true,
    };
    const dev: url.UrlObject = {
        host: `127.0.0.1:${process.env.PORT}`,
        slashes: true,
        protocol: "http",
    };
    
    win.loadURL(url.format(process.env.NODE_ENV === "development" ? dev : prod));

    win.webContents.openDevTools();
}




function initApp() {
    createWindow();
    const dispatch = new Dispatch();
}

app.on("ready", initApp);
