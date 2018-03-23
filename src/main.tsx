import "./resources/1.styl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import { BrowserRouter, Route, Link } from "react-router-dom";

function About() {
    return (
        <h1>hello react-router-dom123123</h1>
    );
}
function App() {
    return (
        <React.Fragment>
            <Link to="/about">about</Link>
            <Route path="/about" component={About} />
        </React.Fragment>
    );
}

ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
        <React.Fragment>
            <h1>Hello, react!T</h1>
            <Button>hello, antd!</Button>
            <App />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root"),
);

console.log("run");
