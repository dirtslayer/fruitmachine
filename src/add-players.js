'use strict';
const fs = require('fs-extra');
const db = require('better-sqlite3')('fm4.db');

const ctscript = fs.readFileSync('./add-players.sql', 'utf8');
db.exec(ctscript);