import * as React from "react";
import { Menu, Icon, Popover, Modal, Input } from "antd";
import { connect } from "react-redux";
const SubMenu = Menu.SubMenu;
import "./style.styl";
import { IStore } from "@store/store";
import {
    getNoteTree,
    INoteTree,
    changeInTree,
    IFindType,
    openKeys,
    selectedKeys,
    IcatalogStatusType,
} from "@components/notecatalog/redux";
import { addTab } from "@components/notetabs/redux";
import { getNoteList, INoteType } from "@views/note/redux";
import { generator } from "@utils/generator";
import { noteUtils } from "@utils/note";
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
    catalogStatus: IcatalogStatusType;
    getNoteTree: () => void;
    addTab: ({ }) => void;
    getNoteList: () => void;
    getSelectedKeys: (keys: string[]) => void;
    changeInTree: (id: string, args: IFindType[]) => void;
    openKeys: (keys: string[]) => void;
    selectedkeys: (keys: string[]) => void;
}

class Note extends React.Component<ICatalog, {
    visible: boolean;
}> {
    public selectedNode: INoteTree = {
        title: "",
        id: "",
        filetype: "folder",
    };
    constructor(props: ICatalog) {
        super(props);
        const { getNoteTree, getNoteList } = this.props;
        getNoteTree();
        getNoteList();
        this.state = {
            visible: false,
        };
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

    public floderOpenChange = (okeys: string[]) => {
        const { openKeys } = this.props;
        openKeys(okeys);
    }

    public onSelect = ({ item, key, skeys }: any) => {
        const { getSelectedKeys, selectedkeys } = this.props;
        selectedkeys([key]);
        getSelectedKeys([key]);
    }


    public del = (id: string, e: any) => {
        e.stopPropagation();
        // e.preventDefault();
        noteUtils.delNode(id);
    }

    public hideModal = (type: "ok" | "cancel") => {
        switch (type) {
            case "ok":
                const { changeInTree } = this.props;
                changeInTree(this.selectedNode.id, [{ props: "title", value: this.selectedNode.title }]);
            default:
                this.setState({
                    visible: false,
                });
                break;
        }
    }

    public openModal = (item: INoteTree, e: any) => {
        e.stopPropagation();
        this.setState({
            visible: true,
        });
        this.selectedNode = item;
    }

    public changeFolderName = (e: any) => {
        this.selectedNode.title = e.target.value;
    }

    // 插入文件或者文件夹
    public insertFF = (fileType: "file-text" | "file-markdown" | "folder", item: INoteTree, e: any) => {
        e.stopPropagation();
        let temp = new Date().getTime() + "";
        noteUtils.createNode({ selectedid: item.id, createid: generator.createId(temp), type: fileType });
    }

    public render() {
        const { noteTree } = this.props;

        const content = (item: INoteTree) => {
            return (
                <div className="noteTree-operation">
                    <Icon type="folder-add" onClick={(e) => { this.insertFF("folder", item, e); }} />
                    <Icon type="file-add" onClick={(e) => { this.insertFF("file-text", item, e); }} />
                    <Icon type="file-markdown" onClick={(e) => { this.insertFF("file-markdown", item, e); }} />
                    <Icon type="edit" onClick={(e) => { this.openModal(item, e); }} />
                    <Icon type="delete" onClick={(e) => { this.del(item.id, e); }} />
                </div>
            );
        };
        const noteRender = (noteTree: INoteTree[]): React.ReactNode => {
            return noteTree.map((item, $index) => {
                if (item.filetype.indexOf("folder") === -1) {
                    return (
                        <Menu.Item
                            key={item.id}
                        >
                            <Icon type={item.filetype} />
                            <span>{item.title}</span>
                        </Menu.Item>
                    );
                } else if (item.nodes) {
                    return (
                        <SubMenu key={item.id} title={
                            <Popover content={content(item)} title={item.title} trigger="hover">
                                <span><Icon type={item.filetype} /><span>{item.title}</span></span>
                            </Popover>
                        }>
                            {noteRender(item.nodes)}
                        </SubMenu>
                    );
                } else {
                    return (
                        <SubMenu key={item.id} title={
                            <Popover content={content(item)} title={item.title} trigger="hover">
                                <span><Icon type={item.filetype} /><span>{item.title}</span></span>
                            </Popover>
                        }>
                        </SubMenu>
                    );
                }
            });
        };
        const { catalogStatus } = this.props;
        return (
            <React.Fragment>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 256 }}
                    openKeys={catalogStatus.openkeys}
                    // defaultSelectedKeys={catalogStatus.selectedkeys}
                    // defaultOpenKeys={catalogStatus.openkeys}
                    mode="inline"
                    className="note-catalog"
                    onOpenChange={this.floderOpenChange}
                    onSelect={this.onSelect}
                >
                    {noteRender(noteTree)}
                </Menu>
                <Modal
                    title="修改文件夹名称"
                    visible={this.state.visible}
                    onOk={() => this.hideModal("ok")}
                    wrapClassName="vertical-center-modal"
                    className="change-folder-name"
                    onCancel={() => this.hideModal("cancel")}
                    okText="确认"
                    cancelText="取消"
                >
                    <Input defaultValue={this.selectedNode.title} onChange={this.changeFolderName} />
                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: IStore, props: {
    getSelectedKeys: (keys: string[]) => void;
}) {
    return {
        noteTree: state.handleNoteTree,
        noteList: state.handleNoteList,
        catalogStatus: state.handleCatalogStatus,
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
        changeInTree: (id: string, args: IFindType[]) => {
            dispatch(changeInTree(id, args));
        },
        openKeys: (keys: string[]) => {
            dispatch(openKeys(keys));
        },
        selectedkeys: (keys: string[]) => {
            dispatch(selectedKeys(keys));
        },
    };
}




export const NoteCatalogComponent = connect(mapStateToProps, mapDispatchToProps)(Note);
