import * as React from "react";
import "./style.styl";
import { Input, Icon } from "antd";
import { NoteCatalogComponent } from "@components/notecatalog";
import { NoteTabsComponent } from "@components/notetabs";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { addFileInList, IAddFileType } from "@views/note/redux";
import { IAddInTreeType, addInTree } from "@components/notecatalog/redux";


interface INoteType {
    addFile: (opt: IAddFileType) => void;
    addInTree: (opt: IAddInTreeType) => void;
}

class Note extends React.Component<INoteType, {
    shrink: string;
    panelClassName: string;
}> {
    // 被用户选中的key,用来得到创建文件或者文件夹的父级ID
    public selectedkeys: string[] = [""];
    constructor(props: INoteType) {
        super(props);
        this.state = {
            shrink: "up",
            panelClassName: "note-tool-panel",
        };
    }

    public shrink = () => {
        this.setState({
            panelClassName: this.state.shrink === "up" ? "note-tool-panel height0" : "note-tool-panel",
            shrink: this.state.shrink === "up" ? "down" : "up",
        });
    }

    public addFolder = (type: "folder" = "folder") => {
        let id = new Date().getTime() + "";
        const { addInTree } = this.props;
        addInTree({
            id: id,
            filetype: type,
        });
    }

    public addFile = (type: "file-text" | "file-markdown") => {
        console.log(type);
        const { addFile, addInTree } = this.props;
        let id = new Date().getTime() + "";
        addFile({
            id: id,
            filetype: type,
            pId: "1",
        });
        addInTree({
            id: id,
            filetype: type,
        });
    }

    public getSelectedKeys = (keys: string[]) => {
        this.selectedkeys = keys;
    }

    // public del = () => {

    // }

    public render() {
        const { shrink, panelClassName } = this.state;
        return (
            <React.Fragment>
                <div className="note-catalog-panel">
                    <Input placeholder="all note" />
                    <div className="tool-box">
                        <div className="title">
                            我的笔记
                        </div>
                        <div className="box">
                            <Icon type="folder-add" title="添加文件夹"
                                onClick={() => this.addFolder()} />
                            <Icon type="file-add" title="添加笔记"
                                onClick={() => this.addFile("file-text")} />
                            <Icon type="file-markdown" title="添加markdown笔记"
                                onClick={() => this.addFile("file-markdown")} />
                            <Icon type="delete" title="删除选中项" />
                            <Icon type={shrink} onClick={this.shrink} />
                        </div>
                    </div>
                    <div className={`${panelClassName}`}>
                        <NoteCatalogComponent getSelectedKeys={this.getSelectedKeys} />
                    </div>
                </div>
                <div className="note-work-panel">
                    <NoteTabsComponent />
                </div>
            </React.Fragment>
        );
    }
}


function mapStateToProps(state: IStore) {
    return {

    };
}

function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        addFile: (opt: IAddFileType) => {
            dispatch(addFileInList(opt));
        },
        addInTree: (opt: IAddInTreeType) => {
            dispatch(addInTree(opt));
        },
    };
}


export const NoteComponent = connect(null, mapDispatchToProps)(Note);

