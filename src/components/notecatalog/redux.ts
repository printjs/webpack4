import { AnyAction } from "redux";

export const GETNOTETREE = "获取笔记目录";
export const CHANGENOTETREE = "更改笔记目录";
export const ADDINTREE = "增加root级别笔记和文件夹";
export const DELINTREE = "删除文件或文件夹在树中";
export const UPDATEFILEINTREE = "更新笔记";
export const UPDATENOTETREE = "更新笔记目录状态";






export interface INoteTree {
    title: string;
    id: string;
    filetype: "file-text" | "file-markdown" | "folder-open" | "folder";
    nodes?: INoteTree[];
}

export function getNoteTree() {
    return {
        type: GETNOTETREE,
    };
}

export interface IAddInTreeType {
    id: string;
    filetype: "file-text" | "file-markdown" | "folder-open" | "folder";
}

export function addInTree(opt: IAddInTreeType) {
    return Object.assign({
        type: ADDINTREE,
    }, opt);
}

export function delInTree(key: string) {
    return {
        type: DELINTREE,
        key: key,
    };
}

export function changeNoteTree() {
    return {
        type: CHANGENOTETREE,
    };
}

const initState: INoteTree[] = [
    {
        title: "欢迎页",
        id: "welcome",
        filetype: "file-text",
    },
    {
        title: "mulu1", id: "1", filetype: "folder", nodes: [
            {
                title: "file1", id: "2", filetype: "file-text",
            },
        ],
    }];

export function handleNoteTree(state: INoteTree[] = initState, action: AnyAction) {
    interface IFindType {
        props: "title" | "id" | "filetype" | "nodes";
        value: string;
    }
    switch (action.type) {
        case GETNOTETREE:
            break;
        case CHANGENOTETREE:
            // findUnderNote(state, action.id, action.args);
            break;
        case ADDINTREE:
            if (action.filetype.indexOf("folder") === -1) {
                state.push({
                    title: action.filetype === "file-text" ? "新建文件" : "新建markdown文件",
                    id: action.id,
                    filetype: action.filetype,
                });
            } else {
                state.push({
                    title: "新建目录",
                    id: action.id,
                    filetype: action.filetype,
                });
            }
            break;
        case DELINTREE:
            findUnderNote(state, action.key, [], "del");
        default:
            break;
    }
    function findUnderNote(state: INoteTree[], id: string, args: IFindType[], operation: "del" | "insert" | "change") {
        for (let i = 0, len = state.length; i < len; i++) {
            if (state[i].id === id) {
                switch (operation) {
                    case "insert":
                        for (let arg of args) {
                            state[i][arg.props] = arg.value;
                        }
                        break;
                    case "del":
                        state.splice(i, 1);
                    default:
                        break;
                }
                return;
            } else if (state[i].nodes) {
                findUnderNote(state[i].nodes, id, args, operation);
            }
        }
    }

    function temp(x: any): x is INoteTree[] {
        return typeof x !== "undefined";
    }
    return state.slice(0);
}

