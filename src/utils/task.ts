import * as cron from "node-cron";
import { ipcRenderer } from "electron";
import { CONSTANT } from "@main/share/constant";
import { store } from "@store/store";

// 每5分钟运行一次任务
export const syncNoteTask = cron.schedule("*/5 * * * *", () => {
    ipcRenderer.send(CONSTANT.NOTEFILE.SYNC, store.getState().handleNote.noteList);
});

