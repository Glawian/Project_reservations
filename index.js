var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy');

const PORT = +process.env.APP_PORT || 3000;
const PROXY_PORT = +process.env.PROXY_PORT || 8080;
const PROXY_URL = 'http://localhost:' + PROXY_PORT;
const isProduction = process.env.WEBPACK_PRODUCTION;
const DIST_PATH = './dist';

var app = express();

app.get('*', isProduction ? express.static(DIST_PATH) : proxy(PROXY_URL));

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})