require('dotenv').config();

const express = require("express");
const app = express();
const app_port = process.env.APP_PORT || 1337;

app.listen(app_port, () => {
    console.log('Running on port ' + app_port);
});

app.post('/add_point', (req, res, next) => {
    console.log('add_point endpoint triggered');
    res.sendStatus(200);
});
