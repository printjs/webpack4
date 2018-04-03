import * as React from "react";
import { Tabs, Button, Icon, Input } from "antd";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { ITabType, updateTab, delTab, addTab } from "@components/notetabs/redux";
const TabPane = Tabs.TabPane;
import "./style.styl";
import { isString } from "util";


interface INoteTabType {
    noteTabStore: ITabType[];
    updateTab: (opt: ITabType) => void;
    delTab: (opt: string) => void;
    addTab: (opt: ITabType) => void;
}


class NoteTabs extends React.Component<INoteTabType, {
    activeKey: string;
}> {
    constructor(props: INoteTabType) {
        super(props);
        const { addTab } = this.props;
        this.state = {
            activeKey: "welcome",
        };
        addTab({
            key: "welcome",
            title: "欢迎页",
        });
    }

    public onChange = (activeKey: string) => {
        this.setState({ activeKey });
    }


    public remove = (targetKey: string) => {
        const { delTab } = this.props;
        delTab(targetKey);
    }

    public onEdit = (targetKey: string | React.MouseEvent<HTMLElement>, action: string) => {
        if (action === "remove" && isString(targetKey)) {
            this.remove(targetKey);
        }
    }


    public render() {
        const { noteTabStore } = this.props;
        return (
            <div className="note-tabs">
                <div className="note-tool">
                    <div className="note-title">
                        <Input placeholder="标题" size="small" />
                    </div>
                    <Icon type="eye" />
                    <Icon type="tags" />
                    <Icon type="link" />
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {noteTabStore.map((pane) =>
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable === false ? false : true}>
                            {pane.title}
                        </TabPane>,
                    )}
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
        updateTab: (opt: ITabType) => {
            dispatch(updateTab(opt));
        },
        delTab: (key: string) => {
            dispatch(delTab(key));
        },
        addTab: (opt: ITabType) => {
            dispatch(addTab(opt));
        },
    };
}


export const NoteTabsComponent = connect(mapStateToProps, mapDispatchToProps)(NoteTabs);
