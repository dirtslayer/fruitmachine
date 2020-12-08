'use strict';
const db = require('better-sqlite3')('fruitmachine.db');
const add_winnings_str = 'INSERT INTO winnings (sid,pid,prize) VALUES (?, ?, ?)';
const add_winnings_stmt = db.prepare(add_winnings_str);

const add_winnings = function (sid,pid,prize) {
    console.log('add winnings: '+ sid + ' ' + pid + ' ' + prize);
    try {
    var e = add_winnings_stmt.run(sid,pid,prize);
    } catch ( error ) {
   // console.log('duplicate');
    }
    return e;
}
module.exports.add_winnings = add_winnings;

const get_player_winnings_str = 'SELECT prize FROM winnings WHERE sid = ? and pid = ?';
const get_player_winnings_stmt = db.prepare(get_player_winnings_str);

const get_player_winnings = function (sid,pid) {
    console.log('get player winnings: '+ sid + ' ' + pid );
    return get_player_winnings_stmt.all(sid,pid);
}
module.exports.get_player_winnings = get_player_winnings;