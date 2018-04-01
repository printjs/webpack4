import { Menu, Icon } from "antd";
import * as React from "react";
import { INoteTree } from "@components/notecatalog/redux";
const SubMenu = Menu.SubMenu;

export function noteRender(notelist: INoteTree[]): React.ReactNode {
    return notelist.map((item, $index) => {
        if (item.type.indexOf("folder") === -1) {
            return (
                <Menu.Item
                    key={item.id}
                >
                    <Icon type={item.type} />
                    <span>{item.title}</span>
                </Menu.Item>
            );
        } else if (item.nodes) {
            return (
                <SubMenu key={item.id} title={<span><Icon type={item.type} /><span>{item.title}</span></span>}>
                    {noteRender(item.nodes)}
                </SubMenu>
            );
        } else {
            return (
                <SubMenu key={item.id} title={<span><Icon type={item.type} /><span>{item.title}</span></span>}>
                </SubMenu>
            );
        }
    });
}
