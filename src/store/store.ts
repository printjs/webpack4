import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { handleTab, ItabStateType } from "@views/note/_notetab/redux";
import { INoteStoreType, handleNote } from "@views/note/_catalog/redux";




export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ItabStateType;
    handleNote: INoteStoreType;
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
    handleNote,
});
export const store = createStore(reducer);
