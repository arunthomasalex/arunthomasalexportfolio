import fs from 'fs';

export default function template(title, content = "", state = {}) {
  let resources = `<script>window.__STATE__=${JSON.stringify(state)}</script>`;
  const files = fs.readdirSync('./public');
  resources += files.map(file => {
    if (file.endsWith('.js')) {
      return `<script src="/public/${file}" defer></script>`
    } else if (file.endsWith('.css')) {
      return `<link rel="stylesheet" type="text/css" href="/public/${file}">`
    }
  }).join('');
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <title> ${title} </title>
            <script>
              window.addEventListener("load", () => {
                  document.querySelector(".preloader").classList.add("fade-out");
                  setTimeout(() => document.querySelector(".preloader").style.display = "none", 600 );
              })
            </script>
            ${resources}
          </head>
          <body>
            <div class="root">
                <div id="app" class="wrap-inner">${content}</div>
            </div>
          </body>
          `;
}
