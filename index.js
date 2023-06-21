const express = require('express');
const basicAuth = require('basic-auth-connect');
const connectSSI = require('connect-ssi');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASIC_AUTH_USER = process.env.USER;
const BASIC_AUTH_PASS = process.env.PASS;

// const docRoot = path.join(__dirname, 'public');
const docRoot = path.join(__dirname, 'docs');

const app = express();

if (BASIC_AUTH_USER && BASIC_AUTH_PASS) {
  app.use(basicAuth(BASIC_AUTH_USER, BASIC_AUTH_PASS));
}

app.use(
  connectSSI({
    baseDir: docRoot,
    ext: '.html',
  })
);

app.use(express.static(docRoot));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
