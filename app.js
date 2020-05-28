require('dotenv').config();

const express = require("express");
const app = express();
const app_port = process.env.APP_PORT || 1337;
const GhostAdminAPI = require('@tryghost/admin-api');

const ghost_admin_api = new GhostAdminAPI({
    url: process.env.GHOST_APP_URL,
    key: process.env.ADMIN_API_KEY,
    version: 'v3'
});

app.listen(app_port, () => {
    console.log('Running on port ' + app_port);
});

app.post('/add_point', (req, res, next) => {
    console.log('add_point endpoint triggered');
    next();
}, async (req, res) => {
    const latest_post = await ghost_admin_api.posts.browse({limit: 1});
    const post_authors = latest_post[0].authors;

    post_authors.forEach(el => {
        console.log('Adding one point to user ' + el.name + ' (' + el.id + ')');
    });
    res.sendStatus(200);
});
