import { Tabs, Icon } from "antd";
import React from "react";
const TabPane = Tabs.TabPane;
import "./nav.styl";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { IRouteProps, history } from "@route/index";
import { getNavRoute } from "@route/nav.redux";


export class Nav extends React.Component<INavTypes, {}> {
    public go(path?: string) {
        if (path) {
            history.replace(path);
        }

    }

    public componentWillMount() {
        this.props.getNavRoute();
    }
    public render() {
        const { NavRoute } = this.props;
        return (
            <ul className="nav-component">
                {NavRoute.map((item, $index) => {
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
        NavRoute: state.handleRoute,
    };
};
const mapDispatchToProps = (dispatch: (p: any) => void) => {
    return {
        getNavRoute: () => {
            dispatch(getNavRoute());
        },
    };
};



export const NavComponent = connect(mapStateToProps, mapDispatchToProps)(Nav);


interface INavTypes {
    NavRoute: IRouteProps[];
    getNavRoute: () => void;
}
