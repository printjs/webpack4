import * as React from "react";
import { Menu, Icon } from "antd";
import { connect } from "react-redux";
const SubMenu = Menu.SubMenu;
import "./style.styl";
import { IStore } from "@store/store";
import { getNoteList, INoteList } from "@components/notecatalog/redux";
import { noteRender } from "@components/notecatalog/utils";
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
    notelist: INoteList[];
    getNotelist: () => void;
}

class Note extends React.Component<ICatalog, {}> {
    constructor(props: ICatalog) {
        super(props);
        const { getNotelist } = this.props;
        getNoteList();
    }

    public handleClick = (e: any) => {
        console.log("click ", e);
    }

    public floderOpenChange = (openKeys: string[]) => {
        console.log(openKeys);
    }

    public render() {
        const { notelist } = this.props;
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
                {noteRender(notelist)}
            </Menu>
        );
    }
}

function mapStateToProps(state: IStore) {
    return {
        notelist: state.handleNoteList,
    };
}


function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        getNotelist: () => {
            dispatch(getNoteList());
        },
    };
}


export const NoteCatalogComponent = connect(mapStateToProps, mapDispatchToProps)(Note);
