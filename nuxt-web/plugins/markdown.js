// const MarkdownIt = require('markdown-it')
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
// const Config = require('markdown-it-chain')
const string = require('string')
const legacySlugify = (s) =>
  string(s)
    .slugify()
    .toString()

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
  .use(markdownItAnchor, {
    level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
    slugify: legacySlugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
    permalink: true, // 开启标题锚点功能
    permalinkBefore: true, // 在标题前创建锚点
    permalinkSymbol: '#',
    permalinkSpace: true
  })
  .use(markdownItTocDoneRight, {
    level: [2, 3],
    // containerId:"table-of-contents shadow",
    // forceFullToc: true,
    containerClass: 'table-of-contents shadow',
    listClass: 'link-ul',
    itemClass: 'link-li',
    linkClass: 'link-a',
    slugify: legacySlugify
  })
  .use(markdownItFootnote)

export default md
