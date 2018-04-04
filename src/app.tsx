import * as React from "react";
import { connect } from "react-redux";
import { Layout, Icon } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { HashRouter, Route } from "react-router-dom";
import { NavComponent } from "@components/nav/nav";
import { getEntryRoute } from "@route/entry.redux";
import { IStore } from "@store/store";
import { IRouteProps } from "./route";


interface IAppTypes {
    entryRoute: IRouteProps[];
    getEntryRoute: () => void;
}

export class App extends React.Component<IAppTypes, {}> {
    constructor(props: IAppTypes) {
        super(props);
        const { getEntryRoute } = this.props;
        getEntryRoute();
    }


    public render() {
        const { entryRoute } = this.props;
        return (
            <HashRouter>
                <Layout>
                    <Sider width={65}>
                        <NavComponent />
                    </Sider>
                    <Layout>
                        <Header style={{ height: 50, background: "#fff", borderBottom: "1px solid #dbdee0" }}></Header>
                        <Content style={{ background: "#fff" }}>
                            <div className="main-panel">
                                {entryRoute.map((item, $index) => {
                                    return (
                                        <Route path={item.path} component={item.component} key={$index}></Route>
                                    );
                                })}
                            </div>
                        </Content>
                        <Footer style={{
                            height: 40, background: "#fff", borderTop: "1px solid #dbdee0", padding: 0, display: "flex",
                            justifyContent: "center", alignItems: "center",
                        }}>
                            <span>Copyright © 蚂蚁金融服务集团</span>
                        </Footer>
                    </Layout>
                </Layout>
            </HashRouter>
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

export const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
