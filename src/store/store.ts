import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { handleTab, ITabType } from "@components/notetabs/note.tabs.redux";
import { handleNoteList, INoteList } from "@components/notecatalog/redux";


export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ITabType[];
    handleNoteList: INoteList[];
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
    handleNoteList,
});
export const store = createStore(reducer);
