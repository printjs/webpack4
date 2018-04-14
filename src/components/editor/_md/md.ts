import MarkdownIt from "markdown-it";
// const hljs = require("highlight.js"); // https://highlightjs.org/
import hljs from "highlight.js";


class MD {
    private md!: MarkdownIt.MarkdownIt;
    constructor() {
        this.md = new MarkdownIt({
            html: true,        // Enable HTML tags in source
            xhtmlOut: true,        // Use "/" to close single tags (<br />).
            // This is only for full CommonMark compatibility.
            breaks: true,        // Convert "\n" in paragraphs into <br>
            langPrefix: "language-",  // CSS language prefix for fenced blocks. Can be
            // useful for external highlighters.
            linkify: false,        // Autoconvert URL-like text to links

            // Enable some language-neutral replacement + quotes beautification
            typographer: false,

            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use "«»„“" for Russian, "„“‚‘" for German,
            // and ["«\xA0", "\xA0»", "‹\xA0", "\xA0›"] for French (including nbsp).
            quotes: "“”‘’",

            // Highlighter function. Should return escaped HTML,
            // or "" if the source string is not changed and should be escaped externaly.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: (str: any, lang: any) => {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return "<pre class='hljs'><code>" +
                            hljs.highlight(lang, str, true).value +
                            "</code></pre>";
                    } catch (__) {
                        console.warn(__);
                    }
                }

                return "<pre class='hljs'><code>" + this.md.utils.escapeHtml(str) + "</code></pre>";
            },
        });
    }


    public render = (str: string) => {
        return this.md.render(str);
    }


    public delHtmlTag(str: string) {
        // 去掉所有的html标记
        str = str.replace(/<br>/g, "\n");
        return str.replace(/<[^>]+>/g, "");
    }
}


export const markdown = new MD();
