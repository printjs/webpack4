import { AnyAction } from "redux";

export const GETNOTELIST = "获取所有笔记的列表";
export const FINDNOTEBYKEY = "通过key来查找笔记";

export interface INoteType {
    title: string;
    context: string;
    type: "file-text" | "file-markdown";
    status: "r" | "w";
    id: string;
    updatetime: string;
    createtime: string;
}


export function getNoteList() {
    return {
        type: GETNOTELIST,
    };
}


const notelist: INoteType[] = [
    {
        title: "file1",
        id: "2",
        type: "file-text",
        context: "123131313",
        status: "r",
        updatetime: "2019-8-8",
        createtime: "2019-8-8",
    },
];

export function handleNoteList(state: INoteType[] = notelist, action: AnyAction) {
    switch (action.type) {
        case GETNOTELIST:
            break;
        default:
            break;
    }
    return state.slice(0);
}
