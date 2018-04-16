import * as React from "react";
import { Icon, Popover, Input, List, message, Popconfirm } from "antd";
import { connect } from "react-redux";
import "./style.styl";
import { IStore } from "@store/store";
import { getNoteList, INoteType } from "@components/notecatalog/redux";
import { generator } from "@utils/generator";
import { addTab, defaultTab } from "@components/notepanel/_notetab/redux";
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
    addTab: ({ }) => void;
    getNoteList: () => void;
    defaultTab: (key: string) => void;
}

class Note extends React.Component<ICatalog, {}> {
    constructor(props: ICatalog) {
        super(props);
        const { getNoteList } = this.props;
        getNoteList();
    }

    public handleClick = (e: any, key: string) => {
        const { noteList, addTab, defaultTab } = this.props;
        for (let i = 0, len = noteList.length; i < len; i++) {
            if (noteList[i].id === key) {
                addTab({
                    key: noteList[i].id,
                    title: noteList[i].title,
                });
                defaultTab(noteList[i].id);
                return;
            }
        }
    }


    public confirm(e: any) {
        e.stopPropagation();
        message.success("Click on Yes");
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
                                    onConfirm={(e) => this.confirm(e)}
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
                                        <Icon type="pushpin-o" />
                                        <Icon type={item.filetype} />
                                        <i>{item.title}</i>
                                    </React.Fragment>
                                }
                                description={<i>{item.context}</i>}
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

function mapStateToProps(state: IStore) {
    return {
        noteList: state.handleNoteList,
    };
}


function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        addTab: (opt: {
            key: string;
            title: string;
        }) => {
            dispatch(addTab(opt));
        },
        getNoteList: () => {
            dispatch(getNoteList());
        },
        defaultTab: (key: string) => {
            dispatch(defaultTab(key));
        },
    };
}






export const NoteCatalogComponent = connect(mapStateToProps, mapDispatchToProps)(Note);
