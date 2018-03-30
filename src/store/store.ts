import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { handleTab, ITabType } from "@components/notetabs/note.tabs.redux";


export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ITabType[];
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
});
export const store = createStore(reducer);
