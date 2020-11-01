import markdownItAnchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
import linkjs from './markdown/link'
// import { slugify } from 'transliteration'
// const slugify = require('transliteration').slugify

// import { transliterate as tr, slugify } from 'transliteration'
// import markdown from 'markdown-it'

const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})
  .use(markdownItAnchor, {
    level: 1, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
    // eslint-disable-next-line
    // slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
    permalink: true, // 开启标题锚点功能
    permalinkBefore: false, // 在标题前创建锚点
    permalinkSymbol: '#',
    permalinkSpace: true
  })
  .use(markdownItFootnote)
  .use(linkjs, {
    target: '_blank',
    rel: 'noopener noreferrer'
  })

export default md
