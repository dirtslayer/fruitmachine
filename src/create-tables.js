'use strict';
const fs = require('fs-extra');
const db = require('better-sqlite3')('fm4.db');

const ctscript = fs.readFileSync('./create-tables.sql', 'utf8');
db.exec(ctscript);

//const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
//console.log(row.firstName, row.lastName, row.email);