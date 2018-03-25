import { Tabs, Icon } from "antd";
import React from "react";
const TabPane = Tabs.TabPane;
import "./nav.styl";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { IRouteProps } from "@route/index";
import { getAllNavRoute } from "@route/nav.redux";


export class Nav extends React.Component<IStore, {}> {
    public componentWillMount() {
        this.props
    }

    public render() {
        const { NavRoute } = this.props;
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


const mapStateToProps = (state: IStore, props: IStore) => {
    return {
        NavRoute: state.NavRoute,
    };
};
const mapDispatchToProps = (dispatch: (p: any) => { type: string }) => {
    return {
        onTodoClick: () => {
            dispatch(getAllNavRoute());
        },
    };
};



export const NavComponent = connect(mapStateToProps)(Nav);
