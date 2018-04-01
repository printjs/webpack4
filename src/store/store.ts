import { createStore, combineReducers } from "redux";
import { handleRoute, IRouteProps } from "@route/index";
import { handleTab, ITabType } from "@components/notetabs/redux";
import { handleNoteTree, INoteTree } from "@components/notecatalog/redux";
import { INoteType, handleNoteList } from "@views/note/redux";


export interface IStore {
    handleRoute: IRouteProps[];
    handleTab: ITabType[];
    handleNoteTree: INoteTree[];
    handleNoteList: INoteType[];
}


const reducer = combineReducers<IStore>({
    handleRoute,
    handleTab,
    handleNoteTree,
    handleNoteList,
});
export const store = createStore(reducer);
