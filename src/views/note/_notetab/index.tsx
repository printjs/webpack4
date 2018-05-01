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
            </Tabs>
        );
    }
}
