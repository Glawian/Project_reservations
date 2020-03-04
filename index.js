var express = require('express');
var proxy = require('express-http-proxy');
const bodyParser = require('body-parser');

const PORT = +process.env.APP_PORT || 3000;
const PROXY_PORT = +process.env.PROXY_PORT || 8080;
const PROXY_URL = 'http://localhost:' + PROXY_PORT;
const isProduction = process.env.WEBPACK_PRODUCTION;
const DIST_PATH = './dist';

var app = express();

var users = require("./src/users.json");
const usersURL = '/users';
app.use(bodyParser.json());

app.get(usersURL, (req, res) => {
    res.json({
        users: users,
    })
})

app.post(usersURL, (req, res) => {
    const user = req.body;
    const newUser = Object.keys(user)[0];
    users[newUser] = user[newUser];
    res.json({
        created: true,
    })
})

app.get('*', isProduction ? express.static(DIST_PATH) : proxy(PROXY_URL));

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})