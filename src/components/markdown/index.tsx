import * as React from "react";
import SimpleMDE from "simplemde";
import * as ReactDOM from "react-dom";



export class MdEditor extends React.Component<{
    getText: (str: string) => void;
    context: string;
}, {}> {
    public simplemde!: SimpleMDE;


    public componentDidMount() {
        const { context } = this.props;
        const textarea: any = ReactDOM.findDOMNode(this.refs.mdeditor);
        const options: SimpleMDE.Options = {
            element: textarea,
            initialValue: context,
        };
        this.simplemde = new SimpleMDE(options);
        this.simplemde.codemirror.on("change", this.changeValue);
    }


    public componentWillUnmount() {
        this.simplemde.codemirror.off("change", this.changeValue);
    }


    public changeValue = () => {
        const { getText } = this.props;
        getText(this.simplemde.value());
    }


    public render() {
        return (
            <textarea ref="mdeditor"></textarea>
        );
    }
}

