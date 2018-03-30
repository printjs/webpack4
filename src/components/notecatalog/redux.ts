import { AnyAction } from "redux";

export const GETNOTELIST = "获取笔记目录";
export const CHANGENOTELIST = "更改笔记目录";
export const ADDFILE = "增加文本笔记";
export const ADDMD = "增加markdown笔记";
export const UPDATEFILE = "更新笔记";
export const UPDATENOTELIST = "更新笔记目录状态";


export interface INotetype {
    title: string;
    context: string;
    type: "file-text" | "file-markdown";
    status: "r" | "w";
    id: string;
    updatetime: string;
    createtime: string;
}




export interface INoteList {
    label: string;
    id: string;
    type: "file-text" | "file-markdown" | "folder-open" | "folder";
    nodes?: INoteList[];
}

export function getNoteList() {
    return {
        type: GETNOTELIST,
    };
}

export function changeNoteList() {
    return {
        type: CHANGENOTELIST,
    };
}

const initState: INoteList[] = [{
    label: "mulu1", id: "1", type: "folder", nodes: [
        {
            label: "file1", id: "2", type: "file-text",
        },
    ],
}];

export function handleNoteList(state: INoteList[] = initState, action: AnyAction) {
    interface IFindType {
        props: "label" | "id" | "type" | "nodes";
        value: string;
    }
    switch (action.type) {
        case GETNOTELIST:
            break;
        case CHANGENOTELIST:
            findUnderNote(state, action.id, action.args);
            break;
        default:
            break;
    }
    function findUnderNote(state: INoteList[], id: string, args: IFindType[]) {
        for (let item of state) {
            if (item.id === id) {
                for (let arg of args) {
                    item[arg.props] = arg.value;
                }
                return;
            } else if (item.nodes) {
                findUnderNote(item.nodes, id, args);
            }
        }
    }
    return state.slice(0);
}

