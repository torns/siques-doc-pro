/* eslint-disable */
// import ToolbarQuote from './module-toobar-quote'

var toolbarOptions = [
  [{ font: [] }, { size: ['small', false, 'large', 'huge'] }, { header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

  [{ header: 1 }, { header: 2 }, { blockquote: ['success', 'warning', 'dangerous', 'default'] }, 'code-block'], // custom button values

  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }, { align: [] }], // outdent/indent

  // dropdown with defaults from theme
  ['link', 'image', 'video', 'formula'],
  ['clean'] // remove formatting button
]

export default () => {
  // console.log(Quill.import)
  const Block = Quill.import('formats/blockquote')
  class Quote extends Block {
    static create(value) {
      let node = super.create(value) // 创建一个节点

      node.setAttribute('class', 'quoto-' + value) // 将输入的 value 放到 href
      return node
    }
  }

  Quill.register(
    {
      'formats/blockquote': Quote
    },
    true
  )

  const quill = new Quill('#quill-container', {
    modules: {
      syntax: true,
      toolbar: toolbarOptions
      // 'quote-toolbar': true
    },
    scrollingContainer: '#scrolling-container',
    tooltip: true,
    theme: 'bubble'
  })

  const parent = document.querySelector('.ql-blockquote .ql-picker-label')
  parent.innerHTML =
    "<svg viewBox='0 0 18 18' style='padding: 0px 0px;'> <rect class='ql-fill ql-stroke' height='3' width='3' x='4' y='5'></rect> <rect class='ql-fill ql-stroke' height='3' width='3' x='11' y='5'></rect> <path class='ql-even ql-fill ql-stroke' d='M7,8c0,4.031-3,5-3,5'></path> <path class='ql-even ql-fill ql-stroke' d='M14,8c0,4.031-3,5-3,5'></path> </svg>"

  const children = document.querySelectorAll('.ql-blockquote .ql-picker-item')
  children.forEach((e) => {
    e.innerHTML = e.dataset.value
  })

  return quill
}
