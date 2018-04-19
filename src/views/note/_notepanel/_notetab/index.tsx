import * as React from "react";
import { Tabs, Icon } from "antd";
const { TabPane } = Tabs;
import { IStore } from "@store/store";
import { connect } from "react-redux";
import "./style.styl";
import { ItabStateType, updateTab, delTab, addTab, ITabType, defaultTab } from "@views/note/_notepanel/_notetab/redux";
import { findNoteById } from "@views/note/_catalog/redux";



interface INoteTabsType {
    noteTabStore: ItabStateType;
    updateTab: (opt: ITabType) => void;
    delTab: (opt: string) => void;
    addTab: (opt: ITabType) => void;
    defaultTab: (key: string) => void;
    findNoteById: (id: string) => void;
}


class NoteTabs extends React.Component<INoteTabsType, {}> {
    constructor(props: INoteTabsType) {
        super(props);
        // const { addTab } = this.props;
        // addTab({
        //     key: "welcome",
        //     title: "欢迎页",
        // });
    }

    public onChange = (activeKey: string) => {
        const { defaultTab, findNoteById } = this.props;
        defaultTab(activeKey);
        findNoteById(activeKey);
    }


    public remove = (targetKey: string) => {
        const { delTab, noteTabStore, defaultTab } = this.props;
        const { tabs } = noteTabStore;
        for (let i = 0, len = tabs.length; i < len; i++) {
            if (targetKey === tabs[i].key) {
                if (tabs[i - 1]) {
                    defaultTab(tabs[i - 1].key);
                } else if (tabs[i + 1]) {
                    defaultTab(tabs[i + 1].key);
                }
                break;
            }
        }
        delTab(targetKey);
    }

    // public onEdit = (targetKey: string | React.MouseEvent<HTMLElement>, action: string) => {
    // }


    public render() {
        const { noteTabStore } = this.props;
        const { tabs, defaultKey } = noteTabStore;
        return (
            <Tabs
                activeKey={defaultKey}
                size="small"
                onChange={this.onChange}
                className="ant-tab-component">
                {tabs.map((pane, $index) => {
                    return (
                        <TabPane tab={
                            <React.Fragment>
                                <span title={pane.title} style={{ marginRight: "5px" }}>{pane.title}</span>
                                <Icon type="close"
                                    onClick={() => this.remove(pane.key)}
                                    style={{ display: pane.closedisable ? "none" : "inline" }} />
                            </React.Fragment>
                        } key={pane.key}>
                        </TabPane>
                    );
                })}
                <TabPane tab="Tab 2" key="2"></TabPane>
                <TabPane tab="Tab 3" key="31"></TabPane>
                <TabPane tab="Tab 3" key="32"></TabPane>
                <TabPane tab="Tab 3" key="33"></TabPane>
                <TabPane tab="Tab 3" key="34"></TabPane>
                <TabPane tab="Tab 3" key="35"></TabPane>
                <TabPane tab="Tab 3" key="36"></TabPane>
                <TabPane tab="Tab 3" key="37"></TabPane>
                <TabPane tab="Tab 3" key="38"></TabPane>
                <TabPane tab="Tab 3" key="39"></TabPane>
                <TabPane tab="Tab 3" key="311"></TabPane>
                <TabPane tab="Tab 3" key="322"></TabPane>
                <TabPane tab="Tab 3" key="333"></TabPane>
                <TabPane tab="Tab 3" key="344"></TabPane>
                <TabPane tab="Tab 3" key="355"></TabPane>
                <TabPane tab="Tab 3" key="366"></TabPane>
                <TabPane tab="Tab 3" key="377"></TabPane>
                <TabPane tab="Tab 3" key="388"></TabPane>
                <TabPane tab="Tab 3" key="399"></TabPane>
                <TabPane tab="Tab 3" key="3123"></TabPane>
                <TabPane tab="Tab 3" key="3"></TabPane>
            </Tabs>
        );
    }
}


function mapStateToProps(state: IStore) {
    const { handleTab } = state;
    return {
        noteTabStore: {
            ...handleTab,
        },
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
        defaultTab: (key: string) => {
            dispatch(defaultTab(key));
        },
        findNoteById: (id: string) => {
            dispatch(findNoteById(id));
        },
    };
}




export const NoteTabsComponent = connect(mapStateToProps, mapDispatchToProps)(NoteTabs);
