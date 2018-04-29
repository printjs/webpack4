import { AnyAction } from "redux";
import moment from "moment";
import { ipcRenderer, IpcMessageEvent } from "electron";
import { CONSTANT } from "@main/share/constant";
import { store } from "@store/store";
import { generator } from "@utils/generator";

export const ADDNOTEINLIST = "在笔记列表中添加文件";
export const DELNOTEINLIST = "删除笔记列表中的文件";
export const UPDATENOTEINLIST = "更新笔记列表";
export const FINDNOTEBYID = "通过id来查找笔记";
export const SYNCNOTELIST = "同步笔记列表";
export const MERGENOTELIST = "将本地文件merge到系统中";

export interface INoteType {
    title: string;
    context: string;
    filetype: "file-text" | "file-markdown";
    status: "r" | "w";
    id: string;
    updatetime: string;
    createtime: string;
    top: boolean;
}

export function syncNoteList() {
    return {
        type: SYNCNOTELIST,
    };
}

export function mergeNoteList(list: INoteType[]) {
    return {
        type: MERGENOTELIST,
        noteList: list,
    };
}


export function addNoteInList(fileType: "file-text" | "file-markdown") {
    let id = generator.createId(new Date().getTime() + "");
    let temp = {
        title: fileType === "file-text" ? "新建文件" : "新建markdown文件",
        id: id,
        filetype: fileType,
        context: "新建内容",
        status: "r",
        updatetime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        createtime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        top: false,
    };
    ipcRenderer.send(CONSTANT.NOTEFILE.CREATE, {
        id: id,
        context: fileType === "file-markdown" ? "新建markdown文件" : "新建文件",
        attr: temp,
    });
    return Object.assign({
        type: ADDNOTEINLIST,
    }, temp);
}

export function delNoteInList(key: string) {
    return {
        type: DELNOTEINLIST,
        id: key,
    };
}

export interface IchangeType {
    value: any;
    props: "title" | "context" | "status" | "top";
}
export function updateNoteInList(key: string, opt: IchangeType[]) {
    return {
        type: UPDATENOTEINLIST,
        id: key,
        item: opt,
    };
}


export function findNoteById(id: string) {
    return {
        type: FINDNOTEBYID,
        id: id,
    };
}



function isIchangeType(x: any): x is IchangeType {
    return typeof x !== "undefined";
}

export interface INoteStoreType {
    noteList: INoteType[];
    note: INoteType;
}

const initNote: INoteStoreType = {
    noteList: [],
    note: {
        title: "init",
        id: "init",
        filetype: "file-text",
        context: `the init file`,
        status: "r",
        updatetime: "init",
        createtime: "init",
        top: false,
    },
};

ipcRenderer.on(CONSTANT.NOTEFILE.GETALL, async (event: IpcMessageEvent, args: any) => {
    store.dispatch(mergeNoteList(args));
});

ipcRenderer.on(CONSTANT.NOTEFILE.CREATE, async (event: IpcMessageEvent, args: any) => {
    console.log(args);
});

export function handleNote(state: INoteStoreType = initNote, action: AnyAction) {
    switch (action.type) {
        case MERGENOTELIST:
            return {
                note: {
                    ...state.note,
                },
                noteList: [
                    ...action.noteList,
                ],
            };
        case ADDNOTEINLIST:
            let params: INoteType = {
                title: action.filetype === "file-text" ? "新建文件" : "新建markdown文件",
                id: action.id,
                filetype: action.filetype,
                context: "新建内容",
                status: "r",
                updatetime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                createtime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                top: false,
            };
            return {
                note: {
                    ...state.note,
                },
                noteList: [
                    ...state.noteList,
                    params,
                ],
            };
        case DELNOTEINLIST:
            let temp = state.noteList.slice(0);
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === action.id) {
                    temp.splice(i, 1);
                    break;
                }
            }
            return {
                note: {
                    ...state.note,
                },
                noteList: [
                    ...temp,
                ],
            };
        case UPDATENOTEINLIST:
            let tempNote!: INoteType;
            let temp2 = state.noteList.map((item, $index) => {
                if (item.id === action.id) {
                    for (let j = 0, jlen = action.item.length; j < jlen; j++) {
                        let param = action.item[j];
                        if (isIchangeType(param)) {
                            item[param.props] = param.value;
                        }
                    }
                    item.updatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                    tempNote = item;
                }
                return item;
            });
            return {
                note: {
                    ...tempNote,
                },
                noteList: [
                    ...temp2,
                ],
            };
        case FINDNOTEBYID:
            let temp3!: INoteType;
            for (let i = 0, len = state.noteList.length; i < len; i++) {
                let source = state.noteList[i];
                if (source.id === action.id) {
                    temp3 = Object.assign({}, source);
                }
            }
            return {
                note: {
                    ...temp3,
                },
                noteList: [
                    ...state.noteList,
                ],
            };
        default:
            return state;
    }
}
