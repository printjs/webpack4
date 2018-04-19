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
    props: "title" | "context" | "status" | "parentId" | "top";
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
        parentId: "",
        top: false,
    },
};

export function handleNote(state: INoteStoreType = initNote, action: AnyAction) {
    switch (action.type) {
        case GETNOTELIST:
            return state;
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
