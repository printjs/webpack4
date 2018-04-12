import { store } from "@store/store";
import { generator } from "@utils/generator";
import { addFileInList } from "@components/notecatalog/redux";


class NoteOperation {
    public createFile(opt: {
        id: string;
        pId: string;
        filetype: "file-text" | "file-markdown";
    }) {
        store.dispatch(addFileInList(opt));
    }

    public createNode(opt: {
        selectedid: string;
        createid: string;
        type: "file-text" | "file-markdown" | "folder";
    }) {
        const { selectedid, createid, type } = opt;
        let nodeName: string = "新建文件";
        switch (type) {
            case "file-markdown":
                nodeName = "新建markdown文件";
                break;
            case "folder":
                nodeName = "新建文件夹";
                break;
            default:
                break;
        }
        store.dispatch(insertInTree(selectedid, [
            {
                props: "id",
                value: createid,
            },
            {
                props: "filetype",
                value: type,
            },
            {
                props: "title",
                value: nodeName,
            },
        ]));
    }

    public delNode(key: string) {
        store.dispatch(delInTree(key));
        store.dispatch(selectedKeys([""]));
    }
}


export const noteUtils = new NoteOperation();
