import { Tabs, Icon } from "antd";
import React from "react";
const TabPane = Tabs.TabPane;
import "./nav.styl";
import { NavRoute } from "@route/nav.route";


export class NavComponent extends React.Component<{}, {}> {
    public render() {
        return (
            <ul className="nav-component">
                {NavRoute.map((item, $index) => {
                    console.log(item, $index);
                    return (
                        <li className="nav-item">
                            <Icon type={item.icon} key={$index} />
                        </li>
                    );
                })}
                <li className="nav-item">
                    <Icon type="book" />
                </li>
            </ul>
        );
    }
}
