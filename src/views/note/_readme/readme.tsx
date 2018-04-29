import * as React from "react";
import "github-markdown-css";
import { markdown } from "@utils/md";
import { CONSTANT } from "@main/share/constant";
import { IpcMessageEvent, ipcRenderer } from "electron";
import { dirname } from "path";




export class Readme extends React.Component<{}, {
    html: string;
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            html: "<i>请等待，正在加载...</i>",
        };
        ipcRenderer.on(CONSTANT.WELCOME.README, (event: IpcMessageEvent, arg: string) => {
            this.setState({
                html: markdown.render(arg),
            });
        });
    }

    public componentDidMount() {
        this.welcome();
    }

    public welcome() {
        ipcRenderer.send(CONSTANT.WELCOME.README);
    }

    public render() {
        const { html } = this.state;
        return (
            <section
                className="markdown-body"
                style={{
                    margin: "10px",
                }}
                dangerouslySetInnerHTML={{ __html: html }}>
            </section>
        );
    }
}
