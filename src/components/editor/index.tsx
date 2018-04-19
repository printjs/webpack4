// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { Input } from "antd";
// const { TextArea } = Input;
// import "./style.styl";
// import { EditorTool } from "@components/editor/_toolbar";
// import { markdown } from "@components/editor/_md/md";
// import classNames from "classnames";
// import "github-markdown-css";
// import { connect } from "react-redux";
// import { IStore } from "@store/store";
// import { INoteType, updateNoteInList, IchangeType } from "@components/notecatalog/redux";
// import { QuillEditor } from "@components/quill";



// interface IeditorType {
//     noteDetail: INoteType;
//     updateNoteInList: (id: string, item: IchangeType[]) => void;
// }
// export class MDRichEditor extends React.Component<IeditorType, {}> {
//     public dom!: React.ReactInstance;
//     public innerText: string = "";
//     constructor(props: IeditorType) {
//         super(props);
//     }

//     public componentDidMount() {
//         document.execCommand("defaultParagraphSeparator", false, "p");
//         this.dom = this.refs.editor;
//     }

//     public listenKeyboard(e: any) {
//         let keyCode = e.keyCode || e.which;
//         if (keyCode === 9) {
//             e.preventDefault();
//             document.execCommand("InsertHTML", false, "    ");
//         }
//     }

//     public watch = (watch: "r" | "w") => {
//         const { updateNoteInList, noteDetail } = this.props;
//         const { filetype, id, context } = noteDetail;
//         updateNoteInList(id, [{
//             value: watch,
//             props: "status",
//         }]);
//         ReactDOM.findDOMNode(this.dom).innerHTML = this.handleContext(watch, context);
//     }

//     public handleContext = (watch: "r" | "w", source: string) => {
//         const { updateNoteInList, noteDetail } = this.props;
//         const { filetype, id, context } = noteDetail;
//         let DOM: string = "";
//         if (watch === "r") {
//             if (filetype === "file-markdown") {
//                 DOM = markdown.render(source);
//             } else {
//                 DOM = source;
//             }
//         } else {
//             DOM = source;
//         }
//         return DOM;
//     }

//     public changeContext(e: any) {
//         const { noteDetail, updateNoteInList } = this.props;
//         const { filetype, id } = noteDetail;
//         let text: string = "";
//         if (filetype === "file-markdown") {
//             text = e.target.innerText;
//         } else if (filetype === "file-text") {
//             text = e.target.innerHTML;
//         }
//         updateNoteInList(id, [{
//             value: text,
//             props: "context",
//         }]);
//     }

//     public render() {
//         const { noteDetail } = this.props;
//         const { status, context } = noteDetail;
//         const editClass = classNames({
//             "message": true,
//             "markdown-body": status === "r",
//         });
//         return (
//             <section className="md-rich-editor">
//                 {/* <EditorTool watch={this.watch} status={status} /> */}
//                                     {/* <TextArea
//                         className={editClass}
//                         onKeyDown={(e) => { this.listenKeyboard(e); }}
//                         onKeyUp={(e) => { this.changeContext(e); }}
//                         ref="editor">
//                     </TextArea> */}
//                                         {/* <pre
//                         className={editClass}
//                         contentEditable={status === "w"}
//                         suppressContentEditableWarning={status === "w"}
//                         onKeyDown={(e) => { this.listenKeyboard(e); }}
//                         onKeyUp={(e) => { this.changeContext(e); }}
//                         ref="editor"
//                         dangerouslySetInnerHTML={{ __html: this.handleContext("r", context) }}>
//                     </pre> */}
//                 <div className="editor-panel">
//                     <QuillEditor />
//                 </div>
//             </section>
//         );
//     }
// }
