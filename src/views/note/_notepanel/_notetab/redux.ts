import { AnyAction } from "redux";

export const ADDTAB = "添加tab页";
export const UPDATETAB = "更新tab页";
export const DELTAB = "删除tab页";
export const DEFAULTTAB = "默认的tab页";

export function addTab(opt: ITabType) {
    return {
        type: ADDTAB,
        key: opt.key,
        title: opt.title,
    };
}

export function updateTab(opt: ITabType) {
    return {
        type: UPDATETAB,
        key: opt.key,
        title: opt.title,
    };
}

export function delTab(key: string) {
    return {
        type: DELTAB,
        key: key,
    };
}


export function defaultTab(key: string) {
    return {
        type: DEFAULTTAB,
        key: key,
    };
}


export interface ITabType {
    title: string;
    key: string;
    closedisable?: boolean;
}

export interface ItabStateType {
    defaultKey: string;
    tabs: ITabType[];
}

const initState = {
    defaultKey: "welcome",
    tabs: [],
};

export function handleTab(state: ItabStateType = initState, action: AnyAction) {
    switch (action.type) {
        case ADDTAB:
            let flag = true;
            for (let item of state.tabs) {
                if (item.key === action.key) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (action.key === "welcome") {
                    state.tabs.push({
                        title: action.title,
                        key: action.key,
                        closedisable: true,
                    });
                } else {
                    state.tabs.push({
                        title: action.title,
                        key: action.key,
                    });
                }
            }
            break;
        case UPDATETAB:
            for (let item of state.tabs) {
                if (item.key === action.key) {
                    item.title = action.title;
                    break;
                }
            }
            break;
        case DELTAB:
            for (let i = 0, len = state.tabs.length; i < len; i++) {
                if (state.tabs[i].key === action.key) {
                    state.tabs.splice(i, 1);
                    break;
                }
            }
            break;
        case DEFAULTTAB:
            state.defaultKey = action.key;
            break;
        default:
            break;
    }
    return Object.assign({}, state);
}

