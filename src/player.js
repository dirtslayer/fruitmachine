'use strict';
const db = require('better-sqlite3')('fruitmachine.db');

const has_player_str = 'SELECT * FROM players WHERE id = ? and server = ?';
var has_player_stmt;
try {
has_player_stmt = db.prepare(has_player_str);
} catch ( error ) {
    const fs = require('fs-extra');
    const ctscript = fs.readFileSync('./create-tables.sql', 'utf8');
    db.exec(ctscript);
    has_player_stmt = db.prepare(has_player_str);
}

const get_player = function (id,server) {
    const newLocal = has_player_stmt.get(id, server);
    return newLocal;
}
module.exports.get_player = get_player;

const has_player = function (id,server) {
    return (typeof has_player_stmt.get(id,server) !== 'undefined');
}
module.exports.has_player = has_player;

const add_player_str = 'INSERT INTO players (server,score,highss,name,id) VALUES (?, ?, ?, ?, ?)';
const add_player_stmt = db.prepare(add_player_str);

const add_player = function ( server, score, highss, name, id ) {
    console.log('add player: '+ server + ' ' + score + ' ' + highss + ' ' + name + ' ' + id);
    return add_player_stmt.run(server,score,highss,name,id);
}
module.exports.add_player = add_player;

/*
const del_player_str = 'DELETE FROM players WHERE id = ?';
const del_player_stmt = db.prepare(del_player_str);

const del_player = function (id) {
    return del_player_stmt.run(id);
}
module.exports.del_player = del_player;


const add_to_score_str = 'UPDATE players SET score = score + ? WHERE id = ? and server = ?';
const add_to_score_stmt = db.prepare(add_to_score_str);

const add_to_score = function (server, amount,id) {
    return add_to_score_stmt.run(server, amount,id);
}
module.exports.add_to_score = add_to_score;
*/
const update_player_str = 'UPDATE players SET score = ?, highss = ?, name = ? WHERE id = ? and server = ?';
const update_player_stmt = db.prepare(update_player_str);

const update_player = function (score,highss,name,id,server) {
    // console.log('update player: '+ score + ' ' + name + ' ' + id);
    return update_player_stmt.run(score,highss,name,id,server);
}
module.exports.update_player = update_player;

const global_str = 'SELECT name,score,server FROM players ORDER BY score DESC LIMIT 50';
const global_stmt = db.prepare(global_str);

const global = function () {
    return global_stmt.all();
}
module.exports.global = global;

const server_top10_str = 'SELECT name,score FROM players WHERE server = ? ORDER BY score DESC LIMIT 10';
const server_top10_stmt = db.prepare(server_top10_str);

const server_top10 = function (server) {
    return server_top10_stmt.all(server);
}
module.exports.server_top10 = server_top10;

const server_leaderboard_str = 'SELECT name,score FROM players WHERE server = ? ORDER BY score DESC';
const server_leaderboard_stmt = db.prepare(server_leaderboard_str);

const server_leaderboard = function (server) {
    return server_leaderboard_stmt.all(server);
}
module.exports.server_leaderboard = server_leaderboard;

const server_first_str = 'SELECT * FROM players WHERE server = ? ORDER BY score DESC LIMIT 1';
const server_first_stmt = db.prepare(server_first_str);

const server_first = function (server) {
    return server_first_stmt.get(server);
}
module.exports.server_first = server_first;

const get_rank_str = 'SELECT * FROM players WHERE server = ? ORDER BY score DESC LIMIT 1 OFFSET ?';
const get_rank_stmt = db.prepare(get_rank_str);

const get_rank = function (server,r) {
    return get_rank_stmt.get(server,r);
}
module.exports.get_rank = get_rank;

const server_search_str = 'SELECT * FROM players WHERE server = ? AND name = ?';
const server_search_stmt = db.prepare(server_search_str);

const server_search = function (server,r) {
    return server_search_stmt.get(server,r);
}
module.exports.server_search = server_search;


const show_rank_str = `select * from ( SELECT row_number() OVER ( ORDER BY score DESC ) rank, * FROM players where server = ?) t where id = ? `;
const show_rank_stmt = db.prepare(show_rank_str);

const show_rank = function (server,id) {
    return show_rank_stmt.get(server,id);
}
module.exports.show_rank = show_rank;



//SELECT * FROM users LIMIT 1 OFFSET 5132;
