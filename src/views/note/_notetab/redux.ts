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
    defaultKey: "",
    tabs: [],
};

export function handleTab(state: ItabStateType = initState, action: AnyAction) {
    switch (action.type) {
        case ADDTAB:
            let flag = true;
            let temp1 = state.tabs.slice(0);
            for (let item of temp1) {
                if (item.key === action.key) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (action.key === "welcome") {
                    temp1.push({
                        title: action.title,
                        key: action.key,
                        closedisable: true,
                    });
                } else {
                    temp1.push({
                        title: action.title,
                        key: action.key,
                    });
                }
            }
            return {
                defaultKey: action.key,
                tabs: [
                    ...temp1,
                ],
            };
        case UPDATETAB:
            let temp2 = state.tabs.slice(0);
            for (let item of temp2) {
                if (item.key === action.key) {
                    item.title = action.title;
                    break;
                }
            }
            return {
                defaultKey: action.key,
                tabs: [
                    ...temp2,
                ],
            };
        case DELTAB:
            let temp3 = state.tabs.slice(0);
            let defaultKey1: string = action.key;
            for (let i = 0, len = temp3.length; i < len; i++) {
                if (temp3[i].key === action.key) {
                    if (temp3[i - 1]) {
                        defaultKey1 = temp3[i - 1].key;
                    } else if (temp3[i + 1]) {
                        defaultKey1 = temp3[i + 1].key;
                    } else {
                        defaultKey1 = "";
                    }
                    temp3.splice(i, 1);
                    break;
                }
            }
            return {
                defaultKey: defaultKey1,
                tabs: [
                    ...temp3,
                ],
            };
        case DEFAULTTAB:
            return {
                defaultKey: action.key,
                tabs: [
                    ...state.tabs,
                ],
            };
        default:
            return state;
    }
}

