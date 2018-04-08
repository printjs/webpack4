import { store } from "@store/store";
import { addFileInList } from "@views/note/redux";
import { addInTree } from "@components/notecatalog/redux";

class NoteOperation {
    public createFile(opt: {
        id: string;
        pId: string;
        filetype: "file-text" | "file-markdown" | "folder-open" | "folder";
    }) {
        if (opt.filetype !== "folder-open" && opt.filetype !== "folder") {
            store.dispatch(addFileInList(opt));
        }
        store.dispatch(addInTree(opt));
    }

    // public delFile() {

    // }
}
