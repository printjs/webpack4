import * as React from "react";
import { Button, Icon, Input, Radio } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import "./style.styl";
import { IStore } from "@store/store";
import { NoteTabsComponent } from "@views/note/_notepanel/_notetab";
import { ITabType } from "@views/note/_notepanel/_notetab/redux";
import { QuillEditor } from "@components/quill";
import { markdown } from "@utils/md";
import classNames from "classnames";
import "github-markdown-css";
import { IchangeType, INoteType } from "@views/note/_catalog/redux";
import { MdEditor } from "@components/markdown";





interface INotePanelType {
    noteDetail: INoteType;
    updateNoteInList: (id: string, item: IchangeType[]) => void;
    updateTab: (opt: ITabType) => void;
}


export class NotePanel extends React.Component<INotePanelType, {}> {
    constructor(props: INotePanelType) {
        super(props);
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

    public renderText = () => {
        const { noteDetail } = this.props;
        const { status, filetype, context } = noteDetail;
        if (status === "r" && filetype === "file-markdown") {
            return markdown.render(context);
        } else {
            return context;
        }
    }

    public render() {
        const { noteDetail } = this.props;
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
            <div className="note-tabs">
                <NoteTabsComponent />
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
        );
    }
}
