import * as React from "react";
import "./style.styl";
import { Input, Icon } from "antd";
import { NoteCatalogComponent } from "@components/notecatalog";
import { NoteTabsComponent } from "@components/notetabs";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { addFileInList, IAddFileType } from "@views/note/redux";
import { IAddInTreeType, addInTree, IcatalogStatusType, insertInTree, IFindType } from "@components/notecatalog/redux";
import { generator } from "@utils/generator";


interface INoteType {
    addFile: (opt: IAddFileType) => void;
    addInTree: (opt: IAddInTreeType) => void;
    catalogStatus: IcatalogStatusType;
    insertInTree: (id: string, args: IFindType[]) => void;
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
        const { addFile, addInTree, catalogStatus } = this.props;
        console.log(catalogStatus);
        let temp = new Date().getTime() + "";
        addFile({
            id: generator.createId(temp),
            filetype: type,
            pId: "1",
        });
        addInTree({
            id: generator.createId(temp),
            filetype: type,
        });
    }

    public test = (type: "file-text" | "file-markdown" | "folder") => {
        const { insertInTree, catalogStatus } = this.props;
        let temp = new Date().getTime() + "";
        if (catalogStatus.selectedKeys.length === 0) {
            insertInTree("", [
                {
                    props: "id",
                    value: generator.createId(temp),
                },
                {
                    props: "filetype",
                    value: type,
                },
                {
                    props: "title",
                    value: "11111111",
                },
            ]);
        } else {
            insertInTree(catalogStatus.selectedKeys[0], [
                {
                    props: "id",
                    value: generator.createId(temp),
                },
                {
                    props: "filetype",
                    value: type,
                },
                {
                    props: "title",
                    value: "11111111",
                },
            ]);
        }
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
                                onClick={() => this.test("folder")} />
                            <Icon type="file-add" title="添加笔记"
                                onClick={() => this.test("file-text")} />
                            <Icon type="file-markdown" title="添加markdown笔记"
                                onClick={() => this.test("file-markdown")} />
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
        catalogStatus: state.handleCatalogStatus,
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
        insertInTree: (id: string, args: IFindType[]) => {
            dispatch(insertInTree(id, args));
        },
    };
}


export const NoteComponent = connect(mapStateToProps, mapDispatchToProps)(Note);

