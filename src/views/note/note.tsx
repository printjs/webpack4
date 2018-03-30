import * as React from "react";
import "./note.styl";
import { Input } from "antd";
import { NoteCatalogComponent } from "@components/notecatalog/note.catalog";
import { NoteTabsComponent } from "@components/notetabs/note.tabs";




export class Note extends React.Component<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                <div className="note-catalog-panel">
                    <Input placeholder="all note" />
                    <div className="note-tool-panel">
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
