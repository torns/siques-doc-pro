/* eslint-disable */
// import Title from '@ckeditor/ckeditor5-heading/src/title';
import { updateDoc } from '@/api/doc'
export default () => {
  return BalloonBlockEditor.create(document.querySelector('#editor'), {
    // plugins: [Title],
    title: {
      placeholder: ''
    },
    placeholder: '',
    autosave: {
      waitingTime: 4000, // in ms
      save(editor) {
        // console.log(editor.getData())

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
        'removeFormat'
      ]
    },
    language: 'zh-cn',
    blockToolbar: [
      'heading',
      'exportPdf',
      'exportWord',
      'CKFinder',
      'imageUpload',
      'mediaEmbed',
      'insertTable',
      'todoList',
      'codeBlock',
      'MathType',
      'ChemType',
      'undo',
      'redo'
    ],
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    licenseKey: ''
  })
}
function saveData(data, docId) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      if (docId) {
        await updateDoc({ id: docId, body: data })
      }

      resolve()
    }, 500)
  })
}
