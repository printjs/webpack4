import { BlockPicker, ColorResult } from "react-color";
import { Popover, Button } from "antd";
import * as React from "react";


export class ColorPick extends React.Component<{
    title: string;
    getColor: (color: ColorResult) => void;
    getCursor: (s: Selection) => void;
}, {}> {
    public colorHex = (color: ColorResult) => {
        const { getColor } = this.props;
        getColor(color);
    }

    public giveCursor = () => {
        let s = window.getSelection();
        const { getCursor } = this.props;
        getCursor(s); 
    }

    public render() {
        const { title } = this.props;
        return (
            <Popover content={
                <BlockPicker onChangeComplete={this.colorHex} />
            } title={title} trigger="click">
                <Button size="small" onClick={this.giveCursor}>{title}</Button>
            </Popover>
        );
    }
}
