import * as React from "react";
import { Tabs, Button } from "antd";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { ITabType, addTab, updateTab, delTab } from "@components/notetabs/note.tabs.redux";
const TabPane = Tabs.TabPane;
import "./note.tabs.styl";


interface INoteTabType {
    noteTabStore: ITabType[];
    addTab: (opt: ITabType) => void;
    updateTab: (opt: ITabType) => void;
    delTab: (opt: string) => void;
}


class NoteTabs extends React.Component<INoteTabType, {
    activeKey: string;
}> {
    public newTabIndex: number = 0;
    constructor(props: INoteTabType) {
        super(props);
        this.state = {
            activeKey: "0",
        };
    }

    public onChange = (activeKey: string) => {
        this.setState({ activeKey });
    }

    public add = () => {
        const { addTab } = this.props;
        addTab({
            key: new Date().getTime() + "",
            title: "ciao" + new Date().getTime(),
        });
    }
    public remove = (targetKey: string) => {
        const { delTab } = this.props;
        delTab(targetKey);
    }
    public render() {
        const { noteTabStore } = this.props;
        return (
            <div className="note-tabs">
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add}>ADD</Button>
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                >
                    {noteTabStore.map((pane) => <TabPane tab={pane.title} key={pane.key}>{pane.title}</TabPane>)}
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state: IStore) {
    return {
        noteTabStore: state.handleTab,
    };
}

function mapDispatchToProps(dispatch: (p: any) => void) {
    return {
        addTab: (opt: ITabType) => {
            dispatch(addTab(opt));
        },
        updateTab: (opt: ITabType) => {
            dispatch(updateTab(opt));
        },
        delTab: (key: string) => {
            dispatch(delTab(key));
        },
    };
}


export const NoteTabsComponent = connect(mapStateToProps, mapDispatchToProps)(NoteTabs);
