import { Tabs, Icon } from "antd";
import React from "react";
const TabPane = Tabs.TabPane;
import "./style.styl";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { IRouteProps, history } from "@route/index";
import { getEntryRoute } from "@route/entry.redux";

interface INavTypes {
    entryRoute: IRouteProps[];
    getEntryRoute: () => void;
}


export class Nav extends React.Component<INavTypes, {}> {
    constructor(props: INavTypes) {
        super(props);
        const { getEntryRoute } = this.props;
        getEntryRoute();
    }

    public go(path?: string) {
        if (path) {
            history.replace(path);
        }

    }

    public render() {
        const { entryRoute } = this.props;
        return (
            <ul className="nav-component">
                {entryRoute.map((item, $index) => {
                    return (
                        <li className="nav-item" key={$index} onClick={
                            () => {
                                this.go(item.path);
                            }
                        }>
                            <Icon type={item.icon} />
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


const mapStateToProps = (state: IStore) => {
    return {
        entryRoute: state.handleRoute,
    };
};
const mapDispatchToProps = (dispatch: (p: any) => void) => {
    return {
        getEntryRoute: () => {
            dispatch(getEntryRoute());
        },
    };
};



export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);

