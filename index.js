//Setup for the Express app
const express = require('express'),
  fs = require('fs-extra'),
  app = express(),
  http = require('http').Server(app),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  path = require('path'),
  port = process.env.PORT || 3001,
  eh = require('./js/error-handler');

// Array of router files for initialization
const RouterModule = require('./routers/router-module');

// Configuration options for connecting to DB
const NODE_ENV = process.env.NODE_ENV.trim();
const isDev = NODE_ENV === 'dev';
console.log('NODE_ENV is', NODE_ENV);

const { massiveOptions } = isDev ? require('./config') : getConfigurations();
connectToDatabase(massiveOptions);

function getConfigurations() {
  const { DB_HOST: host, DB_PORT: port, DB_DATABASE: database, DB_USER: user, DB_PASSWORD: password } = process.env;
  return {
    massiveOptions: {
      host,
      port,
      database,
      user,
      password,
      ssl: true
    }
  };
}

async function connectToDatabase(config) {
  const [err, data] = await eh(massive(config));
  if (err) throw err;
  else {
    if (!data.rap) {
      // No Data Is Found on DB!! Importing Seed Data into DB!
      const [err, seedData] = await eh(fs.readJson('./migration/seed-data.json'));
      if (!err && seedData) {
        // importing as indexed and searchable document table with JSONB due to time constraints, nesting, and scope of challenge.
        // More thought could be put into the DB structure here.
        await eh(data.saveDocs('rap', seedData));
      }
    }
    // pass reference of db connection to app
    app.set('db', data);

    // this is a way to allow us to have individual self-handling router files for each route --> /api/{route}
    RouterModule.init(app);

    // simple handler for SPA
    if (isDev) {
      const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './app/build/index.html'));
      });
    }
  }
}

// middleware to handle header types
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:3001',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://robots-n-pencils.herokuapp.com'
  ];
  try {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

    const origin = req.headers.origin;

    // allow access to the last of origins defined above
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    next();
  } catch (e) {
    // handle the error
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (isDev) app.use(express.static(`${__dirname}/app/build`));

http.listen(port, () => {
  console.log(`R-A-P Initialized!!! on port ${port}`);
});
