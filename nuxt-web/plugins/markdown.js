// const MarkdownIt = require('markdown-it')
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFootnote from 'markdown-it-footnote'
// const Config = require('markdown-it-chain')
const Slugify = require('transliteration').slugify

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
  .use(markdownItAnchor, {
    level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
    slugify: Slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
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
    slugify: Slugify
  })
  .use(markdownItFootnote)

// const config = new Config()
// config.options // Ref: https://markdown-it.github.io/markdown-it/#MarkdownIt.new // Interact with 'options' in new MarkdownIt
//   .html(true) // equal to .set('html', true)
//   .linkify(true)
//   .end()

//   // Interact with 'plugins'
//   .plugin('toc')
//   // The first parameter is the plugin module, which may be a function
//   // while the second parameter is an array of parameters accepted by the plugin.
//   // .default
//   .use(markdownItTocDoneRight, {
//     level: [2, 3]
//   })
//   // Move up one level, like .end() in jQuery.
//   .end()

//   .plugin('anchor')
//   .use(markdownItAnchor, {
//     level: 1, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
//     slugify: Slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
//     permalink: true, // 开启标题锚点功能
//     permalinkBefore: true, // 在标题前创建锚点
//     permalinkSymbol: '#',
//     permalinkSpace: true
//   })
//   // Apply this plugin before toc.
//   .before('toc')

// // Create a markdown-it instance using the above configuration
// const md = config.toMd()

export default md
