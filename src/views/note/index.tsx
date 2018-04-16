import * as React from "react";
import "./style.styl";
import { Input, Icon } from "antd";
import { NoteCatalogComponent } from "@components/notecatalog";
import { NotePanelComponent } from "@components/notepanel";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { addFileInList, IAddFileType } from "@components/notecatalog/redux";
import { generator } from "@utils/generator";



interface INoteType {
    addFile: (opt: IAddFileType) => void;
}

class Note extends React.Component<INoteType, {
    activeKey: string;
}> {

    constructor(props: INoteType) {
        super(props);
        this.state = {
            activeKey: "welcome",
        };
    }


    public createNote = (type: "file-text" | "file-markdown") => {
        let temp = new Date().getTime() + "";
        const { addFile } = this.props;
        addFile({
            id: generator.createId(temp),
            filetype: type,
            pId: "1",
        });
    }

    public delNode = (e: any) => {
        // noteUtils.delNode(this.selectedkeys[0]);
    }

    public activeId = (id: string) => {
        this.setState({
            activeKey: id,
        });
    }


    public render() {
        const { activeKey } = this.state;
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
                        <NoteCatalogComponent />
                    </div>
                </div>
                <div className="note-work-panel">
                    <NotePanelComponent />
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
    };
}


export const NoteComponent = connect(null, mapDispatchToProps)(Note);

