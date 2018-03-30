import "./resources/styles/global.styl";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { AppComponent } from "./app";




ReactDOM.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.getElementById("root"),
);
