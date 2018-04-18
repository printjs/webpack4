import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { INoteStoreType, handleNoteList } from "@components/notecatalog/redux";
import { handleTab, ItabStateType } from "@views/note/_notepanel/_notetab/redux";




export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ItabStateType;
    handleNoteList: INoteStoreType;
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
    handleNoteList,
});
export const store = createStore(reducer);
