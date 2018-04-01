import { AnyAction } from "redux";

export const GETNOTETREE = "获取笔记目录";
export const CHANGENOTETREE = "更改笔记目录";
export const ADDFILE = "增加文本笔记";
export const ADDMD = "增加markdown笔记";
export const UPDATEFILE = "更新笔记";
export const UPDATENOTETREE = "更新笔记目录状态";






export interface INoteTree {
    title: string;
    id: string;
    type: "file-text" | "file-markdown" | "folder-open" | "folder";
    nodes?: INoteTree[];
}

export function getNoteTree() {
    return {
        type: GETNOTETREE,
    };
}

export function changeNoteTree() {
    return {
        type: CHANGENOTETREE,
    };
}

const initState: INoteTree[] = [{
    title: "mulu1", id: "1", type: "folder", nodes: [
        {
            title: "file1", id: "2", type: "file-text",
        },
    ],
}];

export function handleNoteTree(state: INoteTree[] = initState, action: AnyAction) {
    interface IFindType {
        props: "title" | "id" | "type" | "nodes";
        value: string;
    }
    switch (action.type) {
        case GETNOTETREE:
            break;
        case CHANGENOTETREE:
            findUnderNote(state, action.id, action.args);
            break;
        default:
            break;
    }
    function findUnderNote(state: INoteTree[], id: string, args: IFindType[]) {
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

