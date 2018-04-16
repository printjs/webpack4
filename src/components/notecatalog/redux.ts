import { AnyAction } from "redux";
import moment from "moment";

export const GETNOTELIST = "获取所有笔记的列表";
export const ADDNOTEINLIST = "在笔记列表中添加文件";
export const DELNOTEINLIST = "删除笔记列表中的文件";
export const UPDATENOTEINLIST = "更新笔记列表";
export const FINDNOTEBYKEY = "通过key来查找笔记";

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


export interface IAddFileType {
    id: string;
    pId: string;
    filetype: "file-text" | "file-markdown";
}

export function addFileInList(opt: IAddFileType) {
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



const notelist: INoteType[] = [
    {
        title: "file1111111111111111111111111111111111111111111111111111111111111111111111",
        id: "fdgjlkdfjglksdjfasjdlf",
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

export function handleNoteList(state: INoteType[] = notelist, action: AnyAction) {
    let len = state.length;
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
            state.push(params);
            break;
        case DELNOTEINLIST:
            for (let i = 0; i < len; i++) {
                if (state[i].id === action.id) {
                    state.splice(i, 1);
                    break;
                }
            }
            break;
        case UPDATENOTEINLIST:
            for (let i = 0; i < len; i++) {
                let source = state[i];
                if (source.id === action.id) {
                    for (let j = 0, jlen = action.item.length; j < jlen; j++) {
                        let param = action.item[j];
                        if (isIchangeType(param)) {
                            source[param.props] = param.value;
                        }
                    }
                    source.updatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                }
            }
        default:
            break;
    }
    return state.slice(0);
}
