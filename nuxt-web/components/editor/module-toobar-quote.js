import Quill from 'quill'
// import Picker from '../ui/picker'
const Module = Quill.import('core/module')

// const BLOCKTYPE = ['success', 'warning']

class ToolbarQuote extends Module {
  constructor(quill, options) {
    super(quill, options)

    this.quill = quill
    this.toolbar = quill.getModule('toolbar')
    // if (typeof this.toolbar !== 'undefined') this.toolbar.addHandler('quote', this.checkPalatteExist)

    const quoteBtns = document.getElementsByClassName('ql-quote')
    if (quoteBtns) {
      ;[].slice.call(quoteBtns).forEach(function(quoteBtn) {
        quoteBtn.innerHTML = options.buttonIcon
      })
    }
  }
}

ToolbarQuote.DEFAULTS = {
  buttonIcon:
    '<svg viewbox="0 0 18 18"><circle class="ql-fill" cx="7" cy="7" r="1"></circle><circle class="ql-fill" cx="11" cy="7" r="1"></circle><path class="ql-stroke" d="M7,10a2,2,0,0,0,4,0H7Z"></path><circle class="ql-stroke" cx="9" cy="9" r="6"></circle></svg>'
}

function fillSelect(select, values, defaultValue = false) {
  values.forEach(function(value) {
    const option = document.createElement('option')
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected')
    } else {
      option.setAttribute('value', value)
    }
    select.appendChild(option)
  })
}

export default ToolbarQuote
