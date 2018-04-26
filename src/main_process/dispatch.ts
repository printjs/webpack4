import { ipcMain, IpcMessageEvent } from "electron";
import { CONSTANT } from "@main/share/constant";
import { noteUtils } from "@main/controller/note";

export class Dispatch {
    constructor() {
        ipcMain.on(CONSTANT.NOTEFILE.CREATE, async (event: IpcMessageEvent, arg: any) => {
            console.log("213123");
            event.sender.send(CONSTANT.NOTEFILE.CREATE, await noteUtils.openNote("w", "data"));
        });
        ipcMain.on(CONSTANT.NOTEFILE.UPDATE, () => {
            console.log("213123");
        });
        ipcMain.on(CONSTANT.NOTEFILE.DEL, () => {
            console.log("213123");
        });
        ipcMain.on(CONSTANT.NOTEFILE.GETALL, async (event: IpcMessageEvent, arg: any) => {
            event.sender.send(CONSTANT.NOTEFILE.GETALL, await noteUtils.getAllNotes().catch((err) => {
                console.warn(err);
            }));
        });
    }
}

