import Quill from "quill";
import * as React from "react";
import * as ReactDOM from "react-dom";




export class QuillEditor extends React.Component<{
    context: string;
    getText?: (text: string) => void;
    getHTML?: (html: string) => void;
    fileType: string;
}, {}> {
    public quill!: Quill;
    public componentDidMount() {
        this.quill = new Quill(ReactDOM.findDOMNode(this.refs.quill), {
            modules: {
            },
            placeholder: "请输入笔记",
            theme: "snow",
        });
        this.quill.on("text-change", this.textChange);
        this.renderHTML();
    }


    public componentWillUnmount() {
        this.quill.off("text-change", this.textChange);
    }

    public textChange = (a: any, b: any, c: any) => {
        const { getHTML, getText, fileType } = this.props;
        if (getHTML && fileType === "file-text") {
            getHTML(this.quill.root.innerHTML);
        }
        if (getText && fileType === "file-markdown") {
            getText(this.quill.getText());
        }

    }

    public renderHTML = () => {
        const { context, fileType } = this.props;
        this.quill.clipboard.dangerouslyPasteHTML(context);
    }


    public render() {
        return (
            <React.Fragment>
                <div ref="quill">
                    <div ref="toolbar">
                        {/* <!-- Add font size dropdown --> */}
                        <select className="ql-size">
                            <option value="small"></option>
                            {/* <!-- Note a missing, thus falsy value, is used to reset to default --> */}
                            {/* <option selected></option> */}
                            <option value="large"></option>
                            <option value="huge"></option>
                        </select>
                        {/* <!-- Add a bold button --> */}
                        <button className="ql-bold"></button>
                        {/* <!-- Add subscript and superscript buttons --> */}
                        <button className="ql-script" value="sub"></button>
                        <button className="ql-script" value="super"></button>
                        <button className="ql-code-block" value="super"></button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
