import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.styl";
import { EditorTool } from "@components/editor/_toolbar";
import { markdown } from "@components/editor/_md/md";
import classNames from "classnames";
import "github-markdown-css";


export class MDRichEditor extends React.Component<{}, {
    watch: boolean;
}> {
    public dom!: React.ReactInstance;
    constructor(props: {}) {
        super(props);
        this.state = {
            watch: false,
        };
    }

    public componentDidMount() {
        document.execCommand("defaultParagraphSeparator", false, "p");
        this.dom = this.refs.editor;
    }

    public listenKeyboard(e: any) {
        let keyCode = e.keyCode || e.which;
        if (keyCode === 9) {
            e.preventDefault();
            document.execCommand("InsertHTML", false, "    ");
        }
    }

    public watch = (watch: boolean) => {
        console.log(ReactDOM.findDOMNode(this.dom).innerHTML);
        if (watch) {
            this.setState({
                watch: watch,
            });
        }
        console.log(ReactDOM.findDOMNode(this.dom).innerText);
        ReactDOM.findDOMNode(this.dom).innerHTML = markdown.render(ReactDOM.findDOMNode(this.dom).innerText);
    }

    public render() {
        const editClass = classNames({
            "md-rich-work": true,
            "markdown-body": this.state.watch,
        });
        return (
            <section className="md-rich-editor">
                <EditorTool watch={this.watch} />
                <pre
                    className={editClass}
                    contentEditable={!this.state.watch}
                    suppressContentEditableWarning={!this.state.watch}
                    onKeyDown={(e) => { this.listenKeyboard(e); }}
                    ref="editor">
                </pre>
            </section>
        );
    }
} 
