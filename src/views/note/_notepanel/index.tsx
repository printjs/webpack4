import * as React from "react";
import { Button, Icon, Input, Radio } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { connect } from "react-redux";
import "./style.styl";
import { MDRichEditor } from "@components/editor";
import { IStore } from "@store/store";
import { INoteType, updateNoteInList, IchangeType } from "@components/notecatalog/redux";
import { NoteTabsComponent } from "@views/note/_notepanel/_notetab";
import { ITabType, updateTab } from "@views/note/_notepanel/_notetab/redux";



interface INotePanelType {
    noteDetail: INoteType;
    updateNoteInList: (id: string, item: IchangeType[]) => void;
    updateTab: (opt: ITabType) => void;
}


export class NotePanel extends React.Component<INotePanelType, {}> {
    constructor(props: INotePanelType) {
        super(props);
    }

    public changeTitle = (e: any) => {
        const { noteDetail, updateNoteInList, updateTab } = this.props;
        const { id } = noteDetail;
        updateNoteInList(id, [
            {
                value: e.target.value,
                props: "title",
            },
        ]);
        updateTab({
            title: e.target.value,
            key: id,
        });
    }

    public render() {
        const { noteDetail, updateNoteInList } = this.props;
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
                            onChange={this.changeTitle}
                            style={{
                                borderWidth: "0",
                                boxShadow: "0 0 0 0 transparent",
                            }} />
                    </div>
                    <MDRichEditor
                        noteDetail={noteDetail}
                        updateNoteInList={updateNoteInList}
                    />
                </div>
            </div>
        );
    }
}



// function mapStateToProps(state: IStore) {
//     const { handleTab, handleNote } = state;
//     const { defaultKey } = handleTab;
//     const { note } = handleNote;
//     return {
//         noteDetail: {
//             ...note,
//         },
//         defaultKey,
//     };
// }


// function mapDispatchToProps(dispatch: (p: any) => void) {
//     return {
//         updateNoteInList: (id: string, item: IchangeType[]) => {
//             dispatch(updateNoteInList(id, item));
//         },
//         updateTab: (opt: ITabType) => {
//             dispatch(updateTab(opt));
//         },
//     };
// }


// export const NotePanelComponent = connect(null, null)(NotePanel);
