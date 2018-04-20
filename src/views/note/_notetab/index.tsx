import * as React from "react";
import { Tabs, Icon } from "antd";
const { TabPane } = Tabs;
import "./style.styl";
import { findNoteById } from "@views/note/_catalog/redux";
import { ITabType } from "@views/note/_notetab/redux";



interface INoteTabsType {
    tabs: ITabType[];
    defaultKey: string;
    updateTab: (opt: ITabType) => void;
    delTab: (opt: string) => void;
    addTab: (opt: ITabType) => void;
    defaultTab: (key: string) => void;
    findNoteById: (id: string) => void;
}


export class NoteTabs extends React.Component<INoteTabsType, {}> {
    constructor(props: INoteTabsType) {
        super(props);
    }

    public onChange = (activeKey: string) => {
        const { defaultTab, findNoteById } = this.props;
        defaultTab(activeKey);
        findNoteById(activeKey);
    }


    public remove = (targetKey: string, e: any) => {
        e.stopPropagation();
        const { delTab, tabs, findNoteById } = this.props;
        for (let i = 0, len = tabs.length; i < len; i++) {
            if (tabs[i].key === targetKey) {
                if (tabs[i - 1]) {
                    findNoteById(tabs[i - 1].key);
                } else if (tabs[i + 1]) {
                    findNoteById(tabs[i + 1].key);
                } else {
                    // console.warn("");
                }
            }
        }
        delTab(targetKey);
    }

    // public onEdit = (targetKey: string | React.MouseEvent<HTMLElement>, action: string) => {
    // }


    public render() {
        const { tabs, defaultKey } = this.props;
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
                                    onClick={(e) => this.remove(pane.key, e)}
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
