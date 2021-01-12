/* eslint-disable */
// import Title from '@ckeditor/ckeditor5-heading/src/title';
import { updateDoc } from '@/api/doc'

export default () => {
  return BalloonBlockEditor.create(document.querySelector('#editor'), {
    // plugins: [Title],
    title: {
      placeholder: ''
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
      ]
    },
    placeholder: '',
    autosave: {
      waitingTime: 4000, // in ms
      save(editor) {
        return saveData(editor.getData(), editor.docId)
      }
    },
    exportPdf: {
      converterOptions: {
        // Document format settings with proper margins.
        format: 'Letter',
        margin_top: '19mm',
        margin_bottom: '19mm',
        margin_right: '19mm',
        margin_left: '19mm',
        page_orientation: 'portrait'
      }
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    },
    codeBlock: {
      languages: [
        { language: 'plaintext', label: 'Plain text' }, // The default language.
        { language: 'bash', label: 'BASH' },
        { language: 'c', label: 'C' },
        { language: 'cs', label: 'C#' },
        { language: 'cpp', label: 'C++' },
        { language: 'css', label: 'CSS' },
        { language: 'diff', label: 'Diff' },
        { language: 'html', label: 'HTML' },

        { language: 'java', label: 'Java' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'json', label: 'JSON' },
        { language: 'php', label: 'PHP' },
        { language: 'python', label: 'Python' },
        { language: 'ruby', label: 'Ruby' },
        { language: 'sql', label: 'SQL' },
        { language: 'typescript', label: 'TypeScript' },
        { language: 'xml', label: 'XML' },

        { language: 'yml', label: 'YML' }
      ]
    },

    toolbar: {
      items: [
        'bold',
        'italic',
        'link',
        'blockQuote',
        'code',
        'fontBackgroundColor',
        'fontColor',
        'alignment',
        'subscript',
        'superscript',
        'outdent',
        'indent',
        'numberedList',
        'bulletedList',
        'strikethrough',
        'underline',
        'removeFormat'
      ]
    },
    language: 'zh-cn',
    blockToolbar: [
      'heading',
      'exportPdf',
      'exportWord',
      'ckfinder',
      'imageUpload',

      'mediaEmbed',
      'insertTable',
      'todoList',
      'codeBlock',
      'MathType',
      'ChemType',
      'specialCharacters',
      'undo',
      'redo'
    ],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: ''
  })
}
function saveData(data, docId) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (docId) {
        updateDoc({ id: docId, body: data })
      }

      resolve()
    }, 500)
  })
}
