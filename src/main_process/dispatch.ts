import { ipcMain, IpcMessageEvent } from "electron";
import { CONSTANT } from "@main/share/constant";
import { noteUtils } from "@main/controller/note";
import { INoteType } from "@views/note/_catalog/redux";
import { readme } from "@main/note/readme";

export class Dispatch {
    constructor() {
        try {
            noteUtils.initFilesDir();
        } catch (error) {
            console.warn(error);
        }
        ipcMain.on(CONSTANT.NOTEFILE.DEL, async (event: IpcMessageEvent, arg: { id: string }) => {
            const { id } = arg;
            try {
                await noteUtils.delNote(id);
                event.sender.send(CONSTANT.NOTEFILE.DEL, { status: true, id: id });
            } catch (err) {
                event.sender.send(CONSTANT.NOTEFILE.DEL, { status: false, id: id });
            }
        });
        ipcMain.on(CONSTANT.NOTEFILE.GETALL, async (event: IpcMessageEvent, arg: any) => {
            let datas = await noteUtils.getAllNotes();
            event.sender.send(CONSTANT.NOTEFILE.GETALL, datas);
        });
        ipcMain.on(CONSTANT.NOTEFILE.SYNC, async (event: IpcMessageEvent, arg: INoteType[]) => {
            noteUtils.syncNote(arg);
        });
        ipcMain.on(CONSTANT.WELCOME.README, async (event: IpcMessageEvent, arg: string) => {
            const data = await readme(arg).catch((err) => {
                console.warn(err);
            });
            event.sender.send(CONSTANT.WELCOME.README, data);
        });
    }
}

