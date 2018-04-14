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
/**
 * var sLnk=prompt('Write the URL here','http:\/\/');if(sLnk&&sLnk!=''&&sLnk!='http://'){formatDoc('createlink',sLnk)}
 * 超链接
 */
// insertImage url 插入图片

/***
 * 
 *     public test = (s: Selection) => {
        console.log(s);
        let temp = s.getRangeAt(0);
        this.anchorOffset = s.anchorOffset;
        this.focusOffset = s.focusOffset;
        this.startOffset = temp.startOffset;
        this.endOffset = temp.endOffset;
        // let s = window.getSelection();
        // let r = document.createRange();
        // let lastlocation = s.getRangeAt(0);
        // // console.log()
        // // console.log(s);
        // // console.log(r);
        // // console.log(s.getRangeAt(0));
        // // console.log(s.getRangeAt(1));
        // // ReactDOM.findDOMNode(this.dom).focus();
        // r.setStart(s.anchorNode, lastlocation.startOffset);
        // r.setEnd(s.focusNode, lastlocation.endOffset);
        // s.removeAllRanges();
        // s.addRange(r);
    }
    关于移动光标位置的办法
 */

 /***
  * 
  * 
  *         this.dom.focus();
        let temp = ReactDOM.findDOMNode(this.dom).childNodes;
        let index: number = 0;
        for (let i = 0, len = temp.length; i < len; i++) {
            if (temp[i].innerText === "123") {
                index = i;
                break;
            }
        }
        console.log(ReactDOM.findDOMNode(this.dom).childNodes);
        // ReactDOM.findDOMNode(this.dom).children;
        let s = window.getSelection();
        let r = document.createRange();

        console.log(index);
        console.log(temp[index]);
        r.setStart(temp[index], this.startOffset);
        r.setEnd(temp[index], this.startOffset + 2);
        s.removeAllRanges();
        s.addRange(r);
  */
