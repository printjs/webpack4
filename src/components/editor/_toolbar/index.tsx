import * as React from "react";
import { Select, Button, Radio, Icon } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import * as ReactDOM from "react-dom";
const { Option } = Select;
import "./style.styl";
import { connect } from "react-redux";
import { IStore } from "@store/store";
import { updateNoteInList, IchangeType } from "@components/notecatalog/redux";


interface IEditorToolType {
    watch: (status: "r" | "w") => void;
    status: string;
}

export class EditorTool extends React.Component<IEditorToolType, {}> {
    public formatDoc(sCmd: string, sValue?: string) {
        console.log(document.execCommand(sCmd, false, sValue));
        // document.execCommand(
        //     "insertImage",
        //     false,
        //     `https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/
        //     zhidao/pic/item/72f082025aafa40ffae2c406aa64034f79f019c0.jpg`);
    }


    public fontSize = (value: any) => {
        this.formatDoc("formatblock", value);
    }

    public fontFamily = (value: any) => {
        this.formatDoc("fontname", value);
    }

    public color = (value: any) => {
        this.formatDoc("forecolor", value);
    }

    public bgColor = (value: any) => {
        this.formatDoc("backcolor", value);
    }


    public watch = (e: any) => {
        const { watch } = this.props;
        watch(e.target.value);
    }
    // formatblock h6 pre p 字体
    // fontname Arial Black 字体
    // fontsize 1-7 字号
    // forecolor black（16进制） 字体颜色
    // backcolor black 字体背景颜色
    // undo undefined 后退
    // redo undefined 前进
    // removeFormat undefined 清除格式
    // bold undefined 加粗
    // italic undefined 斜体
    // underline undefined 下划线
    // justifyleft undefined 居左
    // justifycenter undefined 居中
    // justifyright undefined 居右
    // insertorderedlist undefined 数字列表
    // insertunorderedlist undefined 原点列表
    // formatblock blockquote 标记指定从另一个来源引用的部分。
    // indent undefined 增加缩进
    // outdent undefined 删除缩进
    public render() {
        const { status } = this.props;
        const fontSize = () => {
            let fontSize = [];
            for (let i = 1; i <= 7; i++) {
                fontSize.push({
                    value: `h${i}`,
                    label: `header${i}`,
                });
            }
            return fontSize;
        };
        return (
            <div className="md-rich-operation-icon">
                <RadioGroup value={status} size="small" onChange={this.watch}>
                    <RadioButton value="r">
                        <Icon type="eye" />
                    </RadioButton>
                    <RadioButton value="w">
                        <Icon type="edit" />
                    </RadioButton>
                </RadioGroup>
                <Select
                    style={{ width: 80 }}
                    onChange={this.fontSize}
                    placeholder="标题"
                    size="small">
                    {fontSize().map((item, $index) => {
                        return (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        );
                    })}
                </Select>
                <Select
                    style={{ width: 60 }}
                    onChange={this.fontFamily}
                    placeholder="字体"
                    size="small">
                    <Option value="Arial">Arial</Option>
                    <Option value="Black">Black</Option>
                </Select>
                <Select
                    style={{ width: 60 }}
                    onChange={this.color}
                    placeholder="颜色"
                    size="small">
                    <Option value="red">red</Option>
                    <Option value="Black">black</Option>
                </Select>
                <Select
                    style={{ width: 60 }}
                    onChange={this.bgColor}
                    placeholder="背景"
                    size="small">
                    <Option value="red">red</Option>
                    <Option value="Black">black</Option>
                </Select>
                <Button size="small"
                    onClick={() => this.formatDoc("undo")}>undo</Button>
                <Button size="small"
                    onClick={() => this.formatDoc("redo")}>redo</Button>
                <Button size="small"
                    onClick={() => this.formatDoc("removeFormat")}>清除格式</Button>
                <Button size="small"
                    onClick={() => this.formatDoc("bold")}>
                    加粗
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("italic")}>
                    斜体
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("underline")}>
                    下划线
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("justifyleft")}>
                    居左
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("justifycenter")}>
                    居中
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("justifyright")}>
                    居右
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("formatblock", "blockquote")}>
                    引用
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("indent")}>
                    增加缩进
                </Button>
                <Button size="small"
                    onClick={() => this.formatDoc("outdent")}>
                    删除缩进
                </Button>
                <Button icon="bars" size="small"
                    onClick={(e) => this.formatDoc("insertorderedlist")} />
                <Button icon="bars" size="small"
                    onClick={(e) => this.formatDoc("insertunorderedlist")} />
                <Button icon="bars" size="small" />
                {/* <Button icon="home" size="small"
                onClick={this.test} /> */}
            </div>
        );
    }
}
