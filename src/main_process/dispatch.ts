import { ipcMain, IpcMessageEvent } from "electron";
import { CONSTANT } from "@main/share/constant";
import { noteUtils } from "@main/controller/note";

export class Dispatch {
    constructor() {
        ipcMain.on(CONSTANT.NOTEFILE.CREATE, async (event: IpcMessageEvent, arg: any) => {
            const { id, context, attr } = arg;
            noteUtils.create(id, context, JSON.stringify(attr));
        });
        ipcMain.on(CONSTANT.NOTEFILE.UPDATE, () => {
            console.log("213123");
        });
        ipcMain.on(CONSTANT.NOTEFILE.DEL, async (event: IpcMessageEvent, arg: { id: string }) => {
            const { id } = arg;
            await noteUtils.delNote(`${id}.zip`).catch((err) => {
                console.warn(err);
                event.sender.send(CONSTANT.NOTEFILE.DEL, { status: false, id: id });
            });
            event.sender.send(CONSTANT.NOTEFILE.DEL, { status: true, id: id });
        });
        ipcMain.on(CONSTANT.NOTEFILE.GETALL, async (event: IpcMessageEvent, arg: any) => {
            let datas = await noteUtils.getAllNotes();
            event.sender.send(CONSTANT.NOTEFILE.GETALL, await noteUtils.getAllNotes());
        });
    }
}

