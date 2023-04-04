const contentElement = document.getElementById('content');

function loadPage(pageName) {
    fetch(`./pages/${pageName}.html`)
      .then((response) => response.text())
      .then((html) => {
        contentElement.innerHTML = html;
        if (pageName === 'compress') {
          const compressScript = document.createElement('script');
          compressScript.src = './scripts/compress.js';
          compressScript.async = true;
          contentElement.appendChild(compressScript);
        }
  
        if (pageName === 'resize') {
          const resizeScript = document.createElement('script');
          resizeScript.src = './scripts/resize.js';
          resizeScript.async = true;
          contentElement.appendChild(resizeScript);
        }
      });
  }
  
document.getElementById('nav-home').addEventListener('click', () => loadPage('home'));
document.getElementById('nav-compress').addEventListener('click', () => loadPage('compress'));
document.getElementById('nav-resize').addEventListener('click', () => loadPage('resize'));
document.getElementById('nav-about').addEventListener('click', () => loadPage('about'));

loadPage('home');