import * as React from "react";
import "./style.styl";
import { Input, Icon } from "antd";
import { NoteCatalogComponent } from "@components/notecatalog";
import { NoteTabsComponent } from "@components/notetabs";




export class Note extends React.Component<{}, {
    shrink: string;
    panelClassName: string;
}> {
    public panelname: string = "";
    constructor(props: {}) {
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
                            <Icon type="folder-add" />
                            <Icon type="file-add" />
                            <Icon type="delete" />
                            <Icon type={shrink} onClick={this.shrink} />
                        </div>
                    </div>
                    <div className={`${panelClassName}`}>
                        <NoteCatalogComponent />
                    </div>
                </div>
                <div className="note-work-panel">
                    <NoteTabsComponent />
                </div>
            </React.Fragment>
        );
    }
}
