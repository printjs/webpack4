import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.styl";
import { EditorToolComponent } from "@components/editor/_toolbar";
import { markdown } from "@components/editor/_md/md";
import classNames from "classnames";
import "github-markdown-css";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { INoteType } from "@components/notecatalog/redux";



interface IeditorType {
    noteDetail: INoteType;
}
class MDRichEditor extends React.Component<IeditorType, {
    status: "r" | "w";
}> {
    public dom!: React.ReactInstance;
    constructor(props: IeditorType) {
        super(props);
        const { noteDetail } = this.props;
        this.state = {
            status: noteDetail.status,
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

    public watch = (watch: "r" | "w") => {
        // console.log(ReactDOM.findDOMNode(this.dom).innerHTML);
        const { noteDetail } = this.props;
        const { filetype } = noteDetail;
        this.setState({
            status: watch,
        });
        if (filetype === "file-markdown") {
            if (watch === "r") {
                ReactDOM.findDOMNode(this.dom).innerHTML = markdown.render(ReactDOM.findDOMNode(this.dom).innerText);
            }
        }
        // else if (filetype === "file-text") {
        //     if (watch === "r") {

        //     }
        // }

        // console.log(ReactDOM.findDOMNode(this.dom).innerText);

    }

    public changeContext(e: any) {
        const {} = this.props;
    }

    public render() {
        const { noteDetail } = this.props;
        const { status } = this.state;
        console.log(status);
        const editClass = classNames({
            "md-rich-work": true,
            "markdown-body": status === "r",
        });
        return (
            <section className="md-rich-editor">
                <EditorToolComponent watch={this.watch} />
                <pre
                    className={editClass}
                    contentEditable={status === "r" ? false : true}
                    suppressContentEditableWarning={status === "r" ? false : true}
                    onKeyDown={(e) => { this.listenKeyboard(e); }}
                    onKeyUp={(e) => { this.changeContext(e); }}
                    ref="editor">
                    {/* {noteDetail} */}
                </pre>
            </section>
        );
    }
}


function mapStateToProps(state: IStore) {
    const { handleTab, handleNoteList } = state;
    const { defaultKey } = handleTab;
    let noteDetail = {
        title: "",
        context: "",
        filetype: "file-markdown",
        status: "r",
        id: "",
        updatetime: "",
        createtime: "",
        parentId: "",
        top: false,
    };
    for (let i = 0, len = handleNoteList.length; i < len; i++) {
        if (handleNoteList[i].id === defaultKey) {
            noteDetail = handleNoteList[i];
        }
    }
    return {
        noteDetail: noteDetail,
    };
}

function mapDispatchToProps(dispatch: (p: any) => void) {
    return {

    };
}

export const MDRichEditorComponent = connect(mapStateToProps)(MDRichEditor);
