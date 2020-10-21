// Node's standard path module
// See https://nodejs.org/api/path.html
let path = require('path');

// The Express web application framework
// See http://expressjs.com/
let express = require('express');

// Library for nicer logging of HTTP requests
// See https://github.com/expressjs/morgan
let logger = require('morgan');

let app = express();

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to log HTTP requests in the 'dev' format
// See the Morgan documentation for what that looks like
app.use(logger('dev'));

// A helper we wrote to capitalize strings
let capitalize = require('./lib/capitalize');

// The overall layout remains the same between pages, so we use
// this helper function to wrap our page-specific content in the layout.
function getLayoutHTML(content) {
  // Template strings can span multiple lines, making them
  // well-suited for, well, acting as templates.
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Do it tho?</title>

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
      </head>
      <body>
        <section id="content">
          ${content}
        </section>
      </body>
    </html>
  `;

  return html;
}

app.get('/', (request, response) => {
  let appDescription = `
    <p>This app has some funny references.</p>
    <p>search around have fun!</p>
  `;

  let content = `
    <h1>All the memes</h1>
    ${appDescription}
    <p></p>
    <p>The link 'do it go fast' will tkae you to the coolest thing you have ever seen!</p>
    <ul>
    <li><a href="/bake">it do</a></li>
    </ul>

  `;

  let pageHtml = getLayoutHTML(content);

  response.send(pageHtml);
});

// Visit, e.g., /bake?baked_good=waffles&count=20
app.get('/bake', (request, response) => {
  let count = Number.parseInt(request.query.count);
  let bakedGood = request.query.baked_good;

  let content = `
    <h1>Do it go fast? ${capitalize(bakedGood)}!</h1>
    <p>
      <a href='/'>Back to the homepage</a>
    </p>
    <p>
      insert whatever you want below and see if it do go fast!
    </p>
    <form method="GET" action="/bake">
      <div class="form-section">
        <label for="baked_good">Baked good:</label>
        <input type="text" name="baked_good" id="baked_good" required>
      </div>
      <div class="form-section">
        
      </div>
      <div class="form-section">
        <input type="submit" value="item">
      </div>
    </form>
    <h2>Our ${capitalize(bakedGood)}</h2>
    <p>
      what is it? ${bakedGood}? 
    </p>
  `;

  content += '<ul>';
  let v= math.floor(math.random()*10000)
  content += '<li>I like that idea lets see!'
  if (v<=5000) {
    content += `<li>it do! ${bakedGood} it goes! ${v}</li>`
  } else {
    content +=  `<li>it dont ${bakedGood} but it still goes! ${v}</li>`
  }
  for (let i = 1; i <= count; i++) {
    content += `<li>${bakedGood} number ${i}</li>`;
  }

  content += '</ul>';

  response.send(getLayoutHTML(content));
});

let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});
