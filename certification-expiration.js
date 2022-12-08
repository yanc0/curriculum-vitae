async function handleRequest(request) {
  const { searchParams, pathname } = new URL(request.url);
  const expiresParam = searchParams.get("expires");
  const link = searchParams.get("link");

  const expires = new Date(expiresParam);
  const today = new Date()
  const expired = today.getTime() > expires.getTime();


  const formatedExpires = formattedDate(expires);
  var cssClass = "active"
  var title = "Active"
  var annotation = `jusqu'au ${formatedExpires}`
  
  if (expired === true ) {
    cssClass = "expired"
    title = "Expirée"
    annotation = `depuis le ${formatedExpires}`
  }

  const body = `
  <!doctype html>
  <html lang="en">
  <head><meta charset="utf-8"></head>
  <style>.certification {
    padding-left: 0.5em;
    display: block;
    width: fit-content;
    border-radius: 0.6em;
    font-size: small;
    font-weight: 600;
    color: #222222;
    font-style: normal;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-decoration: none;
}

.certification--expired {
    color: white;
    background-color: rgb(113, 113, 113);
}

.certification--active {
    color: white;
    background-color: rgba(0, 154, 31, 0.851);
}

.certification-label {
    padding: 0.5em;
    display: inline-block;
    width: fit-content;
    border-radius: 0 0.5em 0.5em 0;
    font-size: small;
    font-weight: 200;

}

.certification-label--expired {
    background-color: rgb(58, 45, 45);
}

.certification-label--active {
    color: white;
    background-color: rgba(0, 121, 4, 0.851);
}
</style>
  <body style="padding: 0; margin: 0;">
      <a class="certification certification--${cssClass}" href="${link}" target="_blank">
        ${title} <span class="certification-label certification-label--${cssClass}">${annotation}</span>
      </a>
  </body>
  </html>
  `;

  return new Response(body, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});

function formattedDate(d) {
  return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
    .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
}