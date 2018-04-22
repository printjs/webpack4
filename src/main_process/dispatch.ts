import { ipcMain } from "electron";
import { CONSTANT } from "@main/constant";

export class Dispatch {
    constructor() {
        ipcMain.on(CONSTANT.CREATENOTEFILE, () => {
            console.log("213123");
        });
    }
}

