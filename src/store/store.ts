import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { INoteStoreType, handleNote } from "@components/notecatalog/redux";
import { handleTab, ItabStateType } from "@views/note/_notepanel/_notetab/redux";




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
