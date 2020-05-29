require('dotenv').config();

const express = require("express");
const app = express();
const app_port = process.env.APP_PORT || 1337;
const GhostAdminAPI = require('@tryghost/admin-api');
const db = require('./db.js');

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
        db.all(`SELECT ${el.id} FROM users`, [], (err, rows) => {
            if (rows.length === 0) {
                const q = 'INSERT INTO users VALUES (?, ?)';

                console.log(`Creating db entry for ${el.name}, (${el.id})`);
                db.run(q, [el.id, 0], (err) => {
                    if (err)
                        throw err;
                });
            }
            const q = `UPDATE users SET points = points + 1 WHERE id = ${el.id}`;

            console.log(`Adding point for ${el.name}, (${el.id})`);
            db.run(q, (err) => {
                if (err)
                    throw err;
            });
        });
    });
    res.sendStatus(200);
});

process.on('exit', () => {
    db.close();
});
