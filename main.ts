import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { Dispatch } from "@main/dispatch";


let win: any = null;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 });

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


    if (process.env.NODE_ENV === "development") {
        win.loadURL(url.format(dev));
        win.webContents.openDevTools();
    } else {
        win.loadURL(url.format(prod));
    }

}




function initApp() {
    createWindow();
    const dispatch = new Dispatch();
}


// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", initApp);


// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        initApp();
    }
});

  // 在这个文件中，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
