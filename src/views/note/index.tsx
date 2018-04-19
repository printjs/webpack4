import * as React from "react";
import "./style.styl";
import { Input, Icon } from "antd";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { generator } from "@utils/generator";
import { ITabType, updateTab, defaultTab, addTab } from "@views/note/_notepanel/_notetab/redux";
import { NotePanel } from "@views/note/_notepanel/_editor";
import { NoteCatalog } from "@views/note/_catalog";
import {
    addNoteInList,
    IAddNoteType,
    findNoteById,
    IchangeType,
    updateNoteInList,
    INoteType,
    getNoteList,
} from "@views/note/_catalog/redux";




interface INoteContainerType {
    addFile: (opt: IAddNoteType) => void;
    findNoteById: (id: string) => void;
    noteDetail: INoteType;
    noteList: INoteType[];
    updateNoteInList: (id: string, item: IchangeType[]) => void;
    updateTab: (opt: ITabType) => void;
    getNoteList: () => void;
    defaultTab: (key: string) => void;
    addTab: (opt: {
        key: string;
        title: string;
    }) => void;
}

class Note extends React.Component<INoteContainerType, {}> {

    constructor(props: INoteContainerType) {
        super(props);
        const { getNoteList } = this.props;
        getNoteList();
    }


    public createNote = (type: "file-text" | "file-markdown") => {
        let temp = new Date().getTime() + "";
        const { addFile } = this.props;
        addFile({
            id: generator.createId(temp),
            filetype: type,
            pId: "1",
        });
    }

    public delNode = (e: any) => {
        // noteUtils.delNode(this.selectedkeys[0]);
    }

    public activeId = (id: string) => {
        const { findNoteById } = this.props;
        findNoteById(id);
    }


    public render() {
        const {
            noteDetail,
            updateNoteInList,
            updateTab,
            findNoteById,
            noteList,
            addTab,
            defaultTab,
        } = this.props;
        return (
            <React.Fragment>
                <div className="note-catalog-panel">
                    <Input placeholder="all note" size="large" />
                    <div className="tool-box">
                        <div className="title">
                            我的笔记
                        </div>
                        <div className="box">
                            <Icon type="file-add" title="添加笔记"
                                onClick={() => this.createNote("file-text")} />
                            <Icon type="file-markdown" title="添加markdown笔记"
                                onClick={() => this.createNote("file-markdown")} />
                        </div>
                    </div>
                    <div className="note-tool-panel">
                        <NoteCatalog
                            findNoteById={findNoteById}
                            noteList={noteList}
                            addTab={addTab}
                            defaultTab={defaultTab}
                        />
                    </div>
                </div>
                <div className="note-work-panel">
                    <NotePanel
                        noteDetail={noteDetail}
                        updateNoteInList={updateNoteInList}
                        updateTab={updateTab} />
                </div>
            </React.Fragment>
        );
    }
}


function mapStateToProps(state: IStore) {
    const { handleNote } = state;
    const { note, noteList } = handleNote;
    return {
        noteDetail: {
            ...note,
        },
        noteList: [
            ...noteList,
        ],
    };
}

function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        addFile: (opt: IAddNoteType) => {
            dispatch(addNoteInList(opt));
        },
        findNoteById: (id: string) => {
            dispatch(findNoteById(id));
        },
        updateNoteInList: (id: string, item: IchangeType[]) => {
            dispatch(updateNoteInList(id, item));
        },
        updateTab: (opt: ITabType) => {
            dispatch(updateTab(opt));
        },
        getNoteList: () => {
            dispatch(getNoteList());
        },
        defaultTab: (key: string) => {
            dispatch(defaultTab(key));
        },
        addTab: (opt: {
            key: string;
            title: string;
        }) => {
            dispatch(addTab(opt));
        },
    };
}


export const NoteComponent = connect(mapStateToProps, mapDispatchToProps)(Note);

