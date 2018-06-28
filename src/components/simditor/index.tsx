import * as React from "react";
import * as ReactDOM from "react-dom";
const Simditor = require("simditor");
require("simditor/styles/simditor.css");
require("@etu/simditor-markdown");



export class SimditorComponent extends React.Component<{}, {}> {
    private editor: any = null;

    public componentDidMount() {
        this.editor = new Simditor({
            textarea: ReactDOM.findDOMNode(this.refs.editor),
            markdown: true,
            toolbar: [
                "title",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "fontScale",
                "color",
                "ol",            // # ordered list
                "ul",            // # unordered list
                "blockquote",
                "|",
                "code",          // # code block
                "|",
                "table",
                "link",
                "image",
                "hr",            // # horizontal ruler
                "indent",
                "outdent",
                "alignment",
                "markdown",
            ],
            pasteImage: true,
            codeLanguages: [
                { name: "Bash", value: "bash" },
                { name: "C++", value: "c++" },
                { name: "C#", value: "cs" },
                { name: "CSS", value: "css" },
                { name: "Erlang", value: "erlang" },
                { name: "Less", value: "less" },
                { name: "Sass", value: "sass" },
                { name: "Diff", value: "diff" },
                { name: "CoffeeScript", value: "coffeescript" },
                { name: "HTML,XML", value: "html" },
                { name: "JSON", value: "json" },
                { name: "Java", value: "java" },
                { name: "JavaScript", value: "js" },
                { name: "Markdown", value: "markdown" },
                { name: "Objective C", value: "oc" },
                { name: "PHP", value: "php" },
                { name: "Perl", value: "parl" },
                { name: "Python", value: "python" },
                { name: "Ruby", value: "ruby" },
                { name: "SQL", value: "sql" },
            ],
            // optional options
        });
    }

    public componentWillUnmount() {
        if (this.editor !== null) {
            this.editor.destroy();
        }
    }

    public render() {
        return (
            <textarea ref="editor" placeholder="Balabala" ></textarea>
        );
    }
}


