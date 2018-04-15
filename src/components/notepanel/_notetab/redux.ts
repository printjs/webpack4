import { AnyAction } from "redux";

export const ADDTAB = "添加tab页";
export const UPDATETAB = "更新tab页";
export const DELTAB = "删除tab页";

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


export interface ITabType {
    title: string;
    key: string;
    closable?: boolean;
}


export function handleTab(state: ITabType[] = [], action: AnyAction) {
    switch (action.type) {
        case ADDTAB:
            let flag = true;
            for (let item of state) {
                if (item.key === action.key) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (action.key === "welcome") {
                    state.push({
                        title: action.title,
                        key: action.key,
                        closable: false,
                    });
                } else {
                    state.push({
                        title: action.title,
                        key: action.key,
                    });
                }
            }
            break;
        case UPDATETAB:
            for (let item of state) {
                if (item.key === action.key) {
                    item.title = action.title;
                    break;
                }
            }
            break;
        case DELTAB:
            for (let i = 0, len = state.length; i < len; i++) {
                if (state[i].key === action.key) {
                    state.splice(i, 1);
                    break;
                }
            }
            break;
        default:
            break;
    }
    return state.slice(0);
}

