export default function template(title, content = "", state = {}) {
  const scripts = `<script src="/public/main.js" defer></script><script>window.__STATE__=${JSON.stringify(state)}</script>`;
  let page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title> ${title} </title>
                  <link type="text/css" href="/public/style.css">
                  ${scripts}
                </head>
                <body>
                  <div class="content">
                     <div id="app" class="wrap-inner">${content}</div>
                  </div>
                </body>
                `;

  return page;
}
