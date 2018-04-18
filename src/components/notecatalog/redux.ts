import { AnyAction } from "redux";
import moment from "moment";

export const GETNOTELIST = "获取所有笔记的列表";
export const ADDNOTEINLIST = "在笔记列表中添加文件";
export const DELNOTEINLIST = "删除笔记列表中的文件";
export const UPDATENOTEINLIST = "更新笔记列表";
export const FINDNOTEBYID = "通过id来查找笔记";

export interface INoteType {
    title: string;
    context: string;
    filetype: "file-text" | "file-markdown";
    status: "r" | "w";
    id: string;
    updatetime: string;
    createtime: string;
    parentId: string;
    top: boolean;
}


export function getNoteList() {
    return {
        type: GETNOTELIST,
    };
}


export interface IAddNoteType {
    id: string;
    pId: string;
    filetype: "file-text" | "file-markdown";
}

export function addNoteInList(opt: IAddNoteType) {
    return Object.assign({
        type: ADDNOTEINLIST,
    }, opt);
}

export function delNoteInList(key: string) {
    return {
        type: DELNOTEINLIST,
        id: key,
    };
}

export interface IchangeType {
    value: any;
    props: "title" | "context" | "status" | "parentId";
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


const noteList: INoteType[] = [
    {
        title: "file1111111111111111111111111111111111111111111111111111111111111111111111",
        id: "111111111111111111111111111111111111111111111111",
        filetype: "file-text",
        context: `We supply a series of design principles,
         practical patterns and high quality design resources
          (Sketch and Axure), to help people create their product prototypes beautifully
           and efficiently.`,
        status: "r",
        updatetime: "2019-8-8",
        createtime: "2019-8-8",
        parentId: "",
        top: false,
    },
];

function isIchangeType(x: any): x is IchangeType {
    return typeof x !== "undefined";
}

export interface INoteStoreType {
    noteList: INoteType[];
    targetNote: INoteType;
}

const initNote = {
    noteList: noteList,
    targetNote: noteList[0],
};

export function handleNoteList(state: INoteStoreType = initNote, action: AnyAction) {
    let len = state.noteList.length;
    let target: INoteType = noteList[0];
    let newNoteList = state.noteList.slice(0);
    switch (action.type) {
        case GETNOTELIST:
            break;
        case ADDNOTEINLIST:
            let params: INoteType = {
                title: action.filetype === "file-text" ? "新建文件" : "新建markdown文件",
                id: action.id,
                filetype: action.filetype,
                context: "新建内容",
                status: "r",
                updatetime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                createtime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                parentId: action.pId,
                top: false,
            };
            newNoteList.push(params);
            break;
        case DELNOTEINLIST:
            for (let i = 0; i < len; i++) {
                if (newNoteList[i].id === action.id) {
                    newNoteList.splice(i, 1);
                    break;
                }
            }
            break;
        case UPDATENOTEINLIST:
            for (let i = 0; i < len; i++) {
                let source = newNoteList[i];
                if (source.id === action.id) {
                    for (let j = 0, jlen = action.item.length; j < jlen; j++) {
                        let param = action.item[j];
                        if (isIchangeType(param)) {
                            source[param.props] = param.value;
                        }
                    }
                    source.updatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                    target = source;
                }
            }
            break;
        case FINDNOTEBYID:
            for (let i = 0; i < len; i++) {
                let source = newNoteList[i];
                if (source.id === action.id) {
                    target = source;
                }
            }
            break;
        default:
            break;
    }
    return {
        noteList: newNoteList,
        targetNote: {
            ...target,
        },
    };
}
