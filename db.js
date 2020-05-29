const sqlite3 = require('sqlite3').verbose();
const db_source = process.env.DB_SOURCE;

let db = new sqlite3.Database(db_source, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        throw err;
    else {
        db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY UNIQUE,
        points INTEGER
        )`, (err) => {
            if (err)
                throw err;
            else {
                console.log('Connected to the database');
            }
        });
    }
});

module.exports = db;
