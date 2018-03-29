import * as React from "react";
import "./note.styl";


export class Note extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="note-panel">
                <div className="note-tool-panel">
                    <div className="note-search-panel"></div>
                    <div className="note-tree-panel"></div>
                </div>
                <div className="note-work-panel">
                    <div className="note-operation-panel"></div>
                    <div className="note-message-panel"></div>
                </div>
            </div>   
        );
    }
}
