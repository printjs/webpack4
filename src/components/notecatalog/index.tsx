import * as React from "react";
import { Menu, Icon } from "antd";
import { connect } from "react-redux";
const SubMenu = Menu.SubMenu;
import "./style.styl";
import { IStore } from "@store/store";
import { getNoteTree, INoteTree } from "@components/notecatalog/redux";
import { noteRender } from "@components/notecatalog/utils";
import { addTab } from "@components/notetabs/redux";
import { getNoteList, INoteType } from "@views/note/redux";
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
    noteTree: INoteTree[];
    noteList: INoteType[];
    getNoteTree: () => void;
    addTab: ({}) => void;
    getNoteList: () => void;
}

class Note extends React.Component<ICatalog, {}> {
    constructor(props: ICatalog) {
        super(props);
        const { getNoteTree, getNoteList } = this.props;
        getNoteTree();
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

    public floderOpenChange = (openKeys: string[]) => {
        // console.log(openKeys);
        openKeys.map((item, $index) => {
            console.log(item);
        });
    }

    public render() {
        const { noteTree } = this.props;
        return (
            <Menu
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                className="note-catalog"
                onOpenChange={this.floderOpenChange}
            >
                {noteRender(noteTree)}
            </Menu>
        );
    }
}

function mapStateToProps(state: IStore) {
    return {
        noteTree: state.handleNoteTree,
        noteList: state.handleNoteList,
    };
}


function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        getNoteTree: () => {
            dispatch(getNoteTree());
        },
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
