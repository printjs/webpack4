import { createStore } from "redux";
import { todoNav, IRouteProps } from "@route/index";

export interface IStore {
    [extra: string]: IRouteProps[];
}

export const store = createStore(
    todoNav,
);
