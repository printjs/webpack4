import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import "./style.styl";


export class MDRichEditor extends React.Component<{}, {}> {
    public dom!: React.ReactInstance;
    constructor(props: {}) {
        super(props);
    }

    public componentDidMount() {
        document.execCommand("defaultParagraphSeparator", false, "p");
        this.dom = this.refs.editor;
    }

    public formatDoc(e: any, sCmd: string, sValue?: string) {
        e.stopPropagation();
        e.preventDefault();
        console.log(document.execCommand(sCmd, false, sValue));
    }

    public listenKeyboard(e: any) {
        let keyCode = e.keyCode || e.which;
        console.log(keyCode);
        if (keyCode === 9) {
            e.preventDefault();
            document.execCommand("InsertHTML", false, "	");
        }
    }

    public render() {
        return (
            <section className="md-rich-editor">
                <div className="md-rich-operation-icon">
                    <Button icon="bars" size="small"
                        onClick={(e) => this.formatDoc(e, "insertorderedlist")} />
                    <Button icon="bars" size="small"
                        onClick={(e) => this.formatDoc(e, "insertunorderedlist")} />
                    <Button icon="bars" size="small" />
                </div>
                <div
                    className="md-rich-work"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onKeyUp={(e) => { e.preventDefault(); this.listenKeyboard(e) }}
                    ref="editor">
                </div>
            </section >
        );
    }
} 
