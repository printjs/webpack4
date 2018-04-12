import * as React from "react";
import { Icon, Popover, Modal, Input, List, Checkbox } from "antd";
import { connect } from "react-redux";
import "./style.styl";
import { IStore } from "@store/store";
import { addTab } from "@components/notetabs/redux";
import { getNoteList, INoteType } from "@components/notecatalog/redux";
import { generator } from "@utils/generator";
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
}

class Note extends React.Component<ICatalog, {}> {
    constructor(props: ICatalog) {
        super(props);
        const { getNoteList } = this.props;
        getNoteList();
    }

    public handleClick = (e: any) => {
        const { noteList, addTab } = this.props;
        for (let i = 0, len = noteList.length; i < len; i++) {
            if (noteList[i].id === e.key) {
                addTab({
                    key: noteList[i].id,
                    title: noteList[i].title,
                });
                return;
            }
        }
    }




    public del = (id: string, e: any) => {
        e.stopPropagation();
        // e.preventDefault();
    }

    public test() {
        console.log(1);
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
                                <Icon type="edit" />,
                                <Icon type="eye-o" />,
                                <Popover content={content} title="Title" trigger="click">
                                    <Icon type="delete" />
                                </Popover>,
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
    };
}




export const NoteCatalogComponent = connect(mapStateToProps, mapDispatchToProps)(Note);
