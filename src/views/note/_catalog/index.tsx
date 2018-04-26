import * as React from "react";
import { Icon, Popover, Input, List, message, Popconfirm } from "antd";
import { connect } from "react-redux";
import "./style.styl";
import { IStore } from "@store/store";
import { generator } from "@utils/generator";
import { addTab, defaultTab, ITabType } from "@views/note/_notetab/redux";
import { INoteType, IchangeType } from "@views/note/_catalog/redux";
import { markdown } from "@utils/md";
/**
 * icon
 * file-text
 * file-markdown
 * folder-open
 * folder
 * folder-add
 * file-add
 * delete
 */

interface ICatalog {
    noteList: INoteType[];
    tabs: ITabType[];
    addTab: (opt: {
        key: string;
        title: string;
    }) => void;
    delTab: (id: string) => void;
    defaultTab: (key: string) => void;
    findNoteById: (id: string) => void;
    updateNoteInList: (id: string, item: IchangeType[]) => void;
    delNoteInList: (id: string) => void;
}

export class NoteCatalog extends React.Component<ICatalog, {}> {
    constructor(props: ICatalog) {
        super(props);
    }

    public handleClick = (e: any, key: string) => {
        const { noteList, addTab, defaultTab, findNoteById } = this.props;
        for (let i = 0, len = noteList.length; i < len; i++) {
            if (noteList[i].id === key) {
                addTab({
                    key: noteList[i].id,
                    title: noteList[i].title,
                });
                defaultTab(noteList[i].id);
                findNoteById(noteList[i].id);
                return;
            }
        }
    }


    public confirm(e: any, id: string) {
        e.stopPropagation();
        const { delNoteInList, delTab, tabs, findNoteById } = this.props;
        for (let i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i].key === id) {
                if (tabs[i - 1]) {
                    findNoteById(tabs[i - 1].key);
                } else if (tabs[i + 1]) {
                    findNoteById(tabs[i + 1].key);
                } else {
                    // console.warn("");
                }
            }
        }
        delTab(id);
        delNoteInList(id);

        message.success(`${id}`);
    }

    public renderText(str: string, fileType: "file-text" | "file-markdown") {
        if (fileType === "file-markdown") {
            return markdown.render(str);
        } else {
            return str;
        }
    }

    public top(id: string, top: boolean, e: any) {
        e.stopPropagation();
        const { updateNoteInList } = this.props;
        updateNoteInList(id, [{
            value: !top,
            props: "top",
        }]);
    }

    public render() {
        const { noteList } = this.props;
        return (
            <React.Fragment>
                <List
                    className="note-catalog"
                    itemLayout="vertical"
                    dataSource={noteList}
                    size="small"
                    renderItem={(item: INoteType) => (
                        <List.Item
                            actions={[
                                <Icon type="profile" onClick={(e) => this.handleClick(e, item.id)} />,
                                <Popconfirm
                                    title="你确定删除这篇笔记吗?"
                                    onConfirm={(e) => this.confirm(e, item.id)}
                                    // onCancel={this.cancel}
                                    okText="确定"
                                    cancelText="取消">
                                    <Icon type="delete" />
                                </Popconfirm>,
                                <Popover content={content} title="Title" trigger="click">
                                    <Icon type="tag-o" />
                                </Popover>,
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <React.Fragment>
                                        <Icon
                                            type="pushpin-o"
                                            style={{
                                                cursor: "pointer",
                                                color: item.top ? "#096dd9" : "ccc",
                                            }}
                                            onClick={(e) => this.top(item.id, item.top, e)}
                                        />
                                        <Icon type={item.filetype} />
                                        <i>{item.title}</i>
                                    </React.Fragment>
                                }
                                description={
                                    <div dangerouslySetInnerHTML={{
                                        __html: this.renderText(item.context, item.filetype),
                                    }}>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </React.Fragment>
        );
    }
}

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

