import markdownItAnchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'

const Slugify = require('transliteration').slugify

const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})
  .use(markdownItAnchor, {
    level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
    slugify: Slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
    permalink: true, // 开启标题锚点功能
    permalinkBefore: false, // 在标题前创建锚点
    permalinkSymbol: '#',
    permalinkSpace: true
  })
  .use(markdownItFootnote)

export default md
