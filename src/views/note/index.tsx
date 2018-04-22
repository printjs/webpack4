import * as React from "react";
import "./style.styl";
import { Input, Icon, Button, Radio } from "antd";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { generator } from "@utils/generator";
import {
    ITabType,
    updateTab,
    defaultTab,
    addTab,
    delTab,
} from "@views/note/_notetab/redux";
import { NoteCatalog } from "@views/note/_catalog";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {
    addNoteInList,
    IAddNoteType,
    findNoteById,
    IchangeType,
    updateNoteInList,
    INoteType,
    getNoteList,
    delNoteInList,
} from "@views/note/_catalog/redux";
import classNames from "classnames";
import { markdown } from "@utils/md";
import { MdEditor } from "@components/markdown";
import { QuillEditor } from "@components/quill";
import { NoteTabs } from "@views/note/_notetab";
import { ipcRenderer } from "electron";




interface INoteContainerType {
    tabs: ITabType[];
    defaultKey: string;
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
    delTab: (id: string) => void;
    delNoteInList: (id: string) => void;
}

class Note extends React.Component<INoteContainerType, {}> {

    constructor(props: INoteContainerType) {
        super(props);
        const { getNoteList } = this.props;
        getNoteList();
        this.createNote.bind(this);

        ipcRenderer.on("test2", (event: any, arg: string) => {
            console.log(event);
            console.log(arg);
        });
    }


    public async createNote(type: "file-text" | "file-markdown") {
        let temp = new Date().getTime() + "";
        const { addFile } = this.props;
        addFile({
            id: generator.createId(temp),
            filetype: type,
            pId: "1",
        });
        console.log(ipcRenderer);
        ipcRenderer.send("test", 12313);
    }


    public renderText = () => {
        const { noteDetail } = this.props;
        const { status, filetype, context } = noteDetail;
        if (status === "r" && filetype === "file-markdown") {
            return markdown.render(context);
        } else {
            return context;
        }
    }

    public changeTitle = (e: any) => {
        const { noteDetail, updateNoteInList, updateTab } = this.props;
        const { id } = noteDetail;
        updateNoteInList(id, [
            {
                value: e.target.value,
                props: "title",
            },
        ]);
        updateTab({
            title: e.target.value,
            key: id,
        });
    }


    public changeStatus = (e: any) => {
        const { noteDetail, updateNoteInList } = this.props;
        const { id } = noteDetail;
        updateNoteInList(id, [
            {
                value: e.target.value,
                props: "status",
            },
        ]);
    }


    public getText = (text: string) => {
        const { noteDetail, updateNoteInList } = this.props;
        const { id } = noteDetail;
        updateNoteInList(id, [
            {
                value: text,
                props: "context",
            },
        ]);
    }

    public getHTML = (text: string) => {
        const { noteDetail, updateNoteInList } = this.props;
        const { id } = noteDetail;
        updateNoteInList(id, [
            {
                value: text,
                props: "context",
            },
        ]);
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
            delNoteInList,
            delTab,
            defaultKey,
            tabs,
        } = this.props;
        const { status, filetype, title } = noteDetail;

        const renderDom = () => {
            const { noteDetail } = this.props;
            const { status, filetype } = noteDetail;
            const editClass = classNames({
                "editor-panel": true,
                "markdown-body": status === "r",
            });

            if (status === "r") {
                return (
                    <div className={editClass}
                        style={{
                            display: "none",
                        }}
                        dangerouslySetInnerHTML={{ __html: this.renderText() }}>
                    </div>
                );
            } else if (status === "w") {
                if (filetype === "file-markdown") {
                    return (
                        <div
                            className="editor-panel"
                            style={{
                                display: "flex",
                            }}
                        >
                            <MdEditor
                                context={this.renderText()}
                                getText={this.getText} />
                        </div>
                    );
                } else if (filetype === "file-text") {
                    return (
                        <div
                            className="editor-panel"
                            style={{
                                display: "flex",
                            }}>
                            <QuillEditor
                                context={this.renderText()}
                                getHTML={this.getHTML} />
                        </div>
                    );
                } else {
                    return (
                        <h1>文件类型错误{filetype}</h1>
                    );
                }
            } else {
                return (
                    <h1>状态错误{status}</h1>
                );
            }
        };
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
                            updateNoteInList={updateNoteInList}
                            delNoteInList={delNoteInList}
                            delTab={delTab}
                            tabs={tabs}
                        />
                    </div>
                </div>
                <div className="note-work-panel">
                    <div className="note-tabs">
                        <NoteTabs
                            tabs={tabs}
                            defaultKey={defaultKey}
                            updateTab={updateTab}
                            delTab={delTab}
                            addTab={addTab}
                            defaultTab={defaultTab}
                            findNoteById={findNoteById}
                        />
                        <div className="MD">
                            <div className="note-title-panel">
                                <RadioGroup size="small" value={filetype}>
                                    <RadioButton value={filetype}><Icon type={filetype} /></RadioButton>
                                </RadioGroup>
                                <RadioGroup value={status} size="small" onChange={this.changeStatus}>
                                    <RadioButton value="r">
                                        <Icon type="eye" />
                                    </RadioButton>
                                    <RadioButton value="w">
                                        <Icon type="edit" />
                                    </RadioButton>
                                </RadioGroup>
                                <Input
                                    className="note-title"
                                    placeholder="标题"
                                    value={title}
                                    size="large"
                                    onChange={this.changeTitle}
                                    style={{
                                        borderWidth: "0",
                                        boxShadow: "0 0 0 0 transparent",
                                    }} />
                            </div>
                            <section className="md-rich-editor">
                                {renderDom()}
                            </section>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


function mapStateToProps(state: IStore) {
    const { handleNote, handleTab } = state;
    const { note, noteList } = handleNote;
    const { defaultKey, tabs } = handleTab;

    return {
        noteDetail: {
            ...note,
        },
        noteList: [
            ...noteList,
        ],
        defaultKey: defaultKey,
        tabs: [
            ...tabs,
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
        delNoteInList: (id: string) => {
            dispatch(delNoteInList(id));
        },
        delTab: (key: string) => {
            dispatch(delTab(key));
        },
    };
}


export const NoteComponent = connect(mapStateToProps, mapDispatchToProps)(Note);

