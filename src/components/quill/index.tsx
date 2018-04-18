import Quill from "quill";
import * as React from "react";
import * as ReactDOM from "react-dom";




export class QuillEditor extends React.Component<{}, {}> {
    public quill!: Quill;
    public componentDidMount() {
        const fonts = ["sofia", "slabo", "roboto", "inconsolata", "ubuntu"];
        this.quill = new Quill(ReactDOM.findDOMNode(this.refs.quill), {
            modules: {
                // toolbar: ReactDOM.1findDOMNode(this.refs.toolbar),
                // "toolbar": [
                //     // { "font": fonts }, 
                //     [{ "size": [] }],
                //     ["bold", "italic", "underline", "strike"],
                //     [{ "color": [] }, { "background": [] }],
                //     [{ "script": "super" }, { "script": "sub" }],
                //     [{ "header": "1" }, { "header": "2" }, "blockquote", "code-block"],
                //     [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
                //     ["direction", { "align": [] }],
                //     ["link", "image", "video", "formula"],
                //     ["clean"],
                // ],
            },
            placeholder: "请输入笔记",
            theme: "snow",
        });
        this.quill.on("text-change", this.textChange);

    }


    public componentWillUnmount() {
        this.quill.off("text-change", this.textChange);
    }

    public textChange = (a: any, b: any, c: any) => {
        console.log(this.quill.getText());
        console.log("===============");
        console.log(this.quill.root.innerHTML);
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
