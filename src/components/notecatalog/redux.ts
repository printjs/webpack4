import { AnyAction } from "redux";

export const GETNOTETREE = "获取笔记目录";
export const CHANGEINTREE = "更改笔记目录";
export const ADDINTREE = "增加root级别笔记和文件夹";
export const DELINTREE = "删除文件或文件夹在树中";
export const INSERTINTREE = "向笔记树中插入文件或者文件夹";
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


export function delInTree(key: string) {
    return {
        type: DELINTREE,
        key: key,
    };
}


export interface IFindType {
    props: "title" | "id" | "filetype" | "nodes";
    value: string | INoteTree[];
}

export function changeInTree(id: string, args: IFindType[]) {
    return {
        type: CHANGEINTREE,
        id,
        args,
    };
}


export function insertInTree(id: string, args: IFindType[]) {
    return {
        type: INSERTINTREE,
        id,
        args,
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
    switch (action.type) {
        case GETNOTETREE:
            break;
        case INSERTINTREE:
            findUnderNote(state, action.id, action.args, "insert");
            break;
        case CHANGEINTREE:
            findUnderNote(state, action.id, action.args, "change");
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
        if (id === "" && operation === "insert") {
            let param: any = {};
            for (let arg of args) {
                param[arg.props] = arg.value;
            }
            state.push(param);
            return false;
        }
        for (let i = 0, len = state.length; i < len; i++) {
            if (state[i].id === id) {
                switch (operation) {
                    case "insert":
                        let param: any = {};
                        for (let arg of args) {
                            param[arg.props] = arg.value;
                        }
                        if (state[i].filetype.indexOf("folder") !== -1) {
                            if (typeof state[i].nodes === "undefined") {
                                state[i].nodes = [];
                            }
                            state[i].nodes.push(param);
                        } else {
                            state.push(param);
                        }
                        break;
                    case "del":
                        state.splice(i, 1);
                        break;
                    case "change":
                        for (let arg of args) {
                            state[i][arg.props] = arg.value;
                        }
                        break;
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


export const OPENKEYS = "打开的笔记目录";
export const SELECTEDKEYS = "选中的节点";


export const openKeys = (openkeys: string[]) => {
    return {
        type: OPENKEYS,
        openkeys,
    };
};

export const selectedKeys = (selectedKeys: string[]) => {
    return {
        type: SELECTEDKEYS,
        selectedKeys,
    };
};


export interface IcatalogStatusType {
    openkeys: string[];
    selectedKeys: string[];
}


export function handleCatalogStatus(state: IcatalogStatusType = { openkeys: [], selectedKeys: [] }, action: AnyAction) {
    switch (action.type) {
        case OPENKEYS:
            return Object.assign({}, state, {
                openkeys: action.openkeys,
            });
        case SELECTEDKEYS:
            return Object.assign({}, state, {
                selectedKeys: action.selectedKeys,
            });
        default:
            return state;
    }
}

