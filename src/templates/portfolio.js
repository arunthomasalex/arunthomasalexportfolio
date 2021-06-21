// html skeleton provider
export default function template(title, content = "") {
    let scripts = `<script src="/public/main.js" defer> </script>`;
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
  