import "./resources/styles/global.styl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Layout, Icon } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { BrowserRouter, Route } from "react-router-dom";
import { NavComponent } from "@components/nav/nav";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { NavRoute } from "@route/nav.route";




ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter forceRefresh={true}>
            <Layout>
                <Sider width={65}>
                    <NavComponent />
                </Sider>
                <Layout>
                    <Header style={{ height: 50, background: "#fff", borderBottom: "1px solid #dbdee0" }}></Header>
                    <Content style={{ background: "#fff" }}>
                        <div className="main-panel">
                            {NavRoute.map((item, $index) => {
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
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
);
