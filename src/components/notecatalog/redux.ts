import { AnyAction } from "redux";
import moment from "moment";

export const GETNOTELIST = "获取所有笔记的列表";
export const ADDFOLDERINLIST = "在笔记列表中添加文件夹";
export const ADDFILEINLIST = "在笔记列表中添加文件";
export const DELNOTEINLIST = "删除笔记列表中的文件或文件夹";
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
        type: ADDFILEINLIST,
    }, opt);
}


const notelist: INoteType[] = [
    {
        title: "file1111111111111111111111111111111111111111111111111111111111111111111111",
        id: "2",
        filetype: "file-text",
        // context: "123123",
        context: `We supply a series of design principles,
         practical patterns and high quality design resources
          (Sketch and Axure), to help people create their product prototypes beautifully
           and efficiently.`,
        status: "r",
        updatetime: "2019-8-8",
        createtime: "2019-8-8",
        parentId: "",
    },
];

export function handleNoteList(state: INoteType[] = notelist, action: AnyAction) {
    switch (action.type) {
        case GETNOTELIST:
            break;
        case ADDFILEINLIST:
            let params: INoteType = {
                title: action.filetype === "file-text" ? "新建文件" : "新建markdown文件",
                id: action.id,
                filetype: action.filetype,
                context: "新建内容",
                status: "r",
                updatetime: moment(new Date()).format("YYYY-MM-DD"),
                createtime: moment(new Date()).format("YYYY-MM-DD"),
                parentId: action.pId,
            };
            state.push(params);
            break;
        default:
            break;
    }

    return state.slice(0);
}
