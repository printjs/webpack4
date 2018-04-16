import * as React from "react";
import { Button, Icon, Input, Radio } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { connect } from "react-redux";
import "./style.styl";
import { MDRichEditorComponent } from "@components/editor";
import { NoteTabsComponent } from "@components/notepanel/_notetab";
import { IStore } from "@store/store";
import { ItabStateType, ITabType } from "@components/notepanel/_notetab/redux";
import { INoteType } from "@components/notecatalog/redux";



interface INotePanelType {
    noteDetail: INoteType;
}


class NotePanel extends React.Component<INotePanelType, {}> {
    constructor(props: INotePanelType) {
        super(props);
    }


    public render() {
        const { noteDetail } = this.props;
        return (
            <div className="note-tabs">
                <NoteTabsComponent />
                <div className="MD">
                    <div className="note-title-panel">
                        <RadioGroup size="small" value={noteDetail.filetype}>
                            <RadioButton value={noteDetail.filetype}><Icon type={noteDetail.filetype} /></RadioButton>
                        </RadioGroup>
                        <Input
                            className="note-title"
                            placeholder="标题"
                            value={noteDetail.title}
                            size="large"
                            style={{
                                borderWidth: "0",
                                boxShadow: "0 0 0 0 transparent",
                            }} />
                    </div>
                    <MDRichEditorComponent />
                </div>
            </div>
        );
    }
}



function mapStateToProps(state: IStore) {
    const { handleTab, handleNoteList } = state;
    const { defaultKey } = handleTab;
    let noteDetail = {
        title: "",
        context: "",
        filetype: "file-markdown",
        status: "r",
        id: "",
        updatetime: "",
        createtime: "",
        parentId: "",
        top: false,
    };
    for (let i = 0, len = handleNoteList.length; i < len; i++) {
        if (handleNoteList[i].id === defaultKey) {
            noteDetail = handleNoteList[i];
            break;
        }
    }
    return {
        noteDetail: noteDetail,
    };
}


function mapDispatchToProps(dispatch: (p: any) => void) {
    return {

    };
}


export const NotePanelComponent = connect(mapStateToProps, mapDispatchToProps)(NotePanel);
