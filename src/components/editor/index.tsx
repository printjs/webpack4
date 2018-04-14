import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.styl";
import { EditorTool } from "@components/editor/_toolbar";
import { markdown } from "@components/editor/_md/md";


export class MDRichEditor extends React.Component<{}, {}> {
    public dom!: React.ReactInstance;
    constructor(props: {}) {
        super(props);
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
        if (watch) {
            console.log(ReactDOM.findDOMNode(this.dom).innerHTML);
            console.log(markdown.render(ReactDOM.findDOMNode(this.dom).innerText));
        }
    }

    public render() {
        return (
            <section className="md-rich-editor">
                <EditorTool watch={this.watch} />
                <pre
                    className="md-rich-work"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => { this.listenKeyboard(e); }}
                    ref="editor">
                </pre>
            </section >
        );
    }
} 
