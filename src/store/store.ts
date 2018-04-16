import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { INoteType, handleNoteList } from "@components/notecatalog/redux";
import { handleTab, ItabStateType } from "@components/notepanel/_notetab/redux";



export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ItabStateType;
    handleNoteList: INoteType[];
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
    handleNoteList,
});
export const store = createStore(reducer);
