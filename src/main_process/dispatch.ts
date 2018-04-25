import { ipcMain, IpcMessageEvent } from "electron";
import { CONSTANT } from "@main/share/constant";

export class Dispatch {
    constructor() {
        ipcMain.on(CONSTANT.NOTEFILE.CREATE, (event: IpcMessageEvent, arg: any) => {
            console.log("213123");
            // event.sender.send
        });
        ipcMain.on(CONSTANT.NOTEFILE.UPDATE, () => {
            console.log("213123");
        });
        ipcMain.on(CONSTANT.NOTEFILE.DEL, () => {
            console.log("213123");
        });
    }
}

