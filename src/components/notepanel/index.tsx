import * as React from "react";
import { Button, Icon, Input, Radio } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { connect } from "react-redux";
import "./style.styl";
import { MDRichEditor } from "@components/editor";
import { NoteTabsComponent } from "@components/notepanel/_notetab";




class NotePanel extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div className="note-tabs">
                <NoteTabsComponent />
                <div className="MD">
                    <div className="note-title-panel">
                        <RadioGroup defaultValue="a" size="small">
                            <RadioButton value="a">markdown</RadioButton>
                            <RadioButton value="b">richtext</RadioButton>
                        </RadioGroup>
                        <Input
                            className="note-title"
                            placeholder="标题"
                            size="large"
                            style={{
                                borderWidth: "0",
                                boxShadow: "0 0 0 0 transparent",
                            }} />
                    </div>
                    <MDRichEditor />
                </div>
            </div>
        );
    }
}




export const NotePanelComponent = connect()(NotePanel);
