import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";

export interface IStore {
    handleRoute: IRouteProps[];
}


const reducer = combineReducers({
    handleRoute,
});
export const store = createStore(reducer);
