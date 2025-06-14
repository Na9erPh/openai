const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdfjs/build/pdf.worker.js';
const input = document.getElementById('pdf-input');
const book = document.getElementById('book');
const dirRadios = document.querySelectorAll('input[name="direction"]');
let currentDirection = 'ltr';

function clearBook() {
  while (book.firstChild) {
    book.removeChild(book.firstChild);
  }
}

dirRadios.forEach(r => {
  r.addEventListener('change', () => {
    currentDirection = document.querySelector('input[name="direction"]:checked').value;
    book.style.direction = currentDirection;
  });
});

input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {
      loadPDF(new Uint8Array(this.result));
    };
    reader.readAsArrayBuffer(file);
  }
});

async function loadPDF(data) {
  clearBook();
  const pdf = await pdfjsLib.getDocument({data}).promise;
  const total = pdf.numPages;
  const pages = [];
  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({scale: 1});
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({canvasContext: context, viewport}).promise;
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page';
    pageDiv.appendChild(canvas);
    pages.push(pageDiv);
  }
  if (currentDirection === 'rtl') {
    pages.reverse();
  }
  pages.forEach(p => book.appendChild(p));
  $(book).turn({width:800, height:600, autoCenter:true});
}
