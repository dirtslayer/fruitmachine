'use strict';
const { re } = require('./emoji');
const db = require('better-sqlite3')('fm4.db');

const server_settings_str = 'SELECT * FROM settings WHERE server = ?';
var server_settings_stmt;

try {
  server_settings_stmt = db.prepare(server_setttings_str);
} catch ( error ) {
    const fs = require('fs-extra');
    const ctscript = fs.readFileSync('./create-tables.sql', 'utf8');
    db.exec(ctscript);
    server_settings_stmt = db.prepare(server_settings_str);
}

const get_server_settings = function (server) {
    return server_settings_stmt.all(server);
}
module.exports.get_server_settings = get_server_settings;

const has_server = function (server) {
    return (typeof server_settings_stmt.get(server) !== 'undefined');
}
module.exports.has_server = has_server;

const new_server = function (server) {
  var new_server_str ;
  new_server_str  = `INSERT INTO settings (server,value,id) VALUES ('${server}','🍒',0);`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','🍋',1);`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','🍌',3);`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','🍇',2);`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','🍉',4);`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','fm-','prefix');`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','352485891220176899','admin-user');`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','true','alias');`;
  new_server_str += '\n';
  new_server_str += `INSERT INTO settings (server,value,id) VALUES ('${server}','false','channel');`;
  

  console.log(new_server_str);
  db.exec(new_server_str);
}
module.exports.new_server = new_server;

const get_server_prizes_str = `select id as prize_number, value as prize from settings where server = ? and 
  ( id == '0' or id == '1' or id == '2' or id == '3' or id == '4')`;
const get_server_prizes_stmt = db.prepare(get_server_prizes_str);

const get_server_prizes = function (server) {
  var result =  get_server_prizes_stmt.all(server);
  //console.log(JSON.stringify(result));
  var toret = new Array(5);
  result.forEach(element => {
    toret[element.prize_number] = element.prize;
  });
  return toret;
}
module.exports.get_server_prizes = get_server_prizes;

const set_prize =  async function (emojii, id, server) {   
  const set_prize_str = `UPDATE settings SET value = '${emojii}' WHERE id = '${id}' and server = '${server}'`;
  console.log(emojii, id, server);
    //return await set_prize_stmt.run(emojii,id, server);
  return await db.exec(set_prize_str);  
}
module.exports.set_prize = set_prize;
//////
const get_server_prefix_str = `select value as prefix from settings where id = 'prefix' and server = ?`;
const get_server_prefix_stmt = db.prepare(get_server_prefix_str);

const get_server_prefix = function (server) {
  var result =  get_server_prefix_stmt.get(server);  
  return result.prefix;
}
module.exports.get_server_prefix = get_server_prefix;

const set_server_prefix = async function (prefix,server) {
  const set_server_prefix_str = `update settings set value = '${prefix}' where id = 'prefix' and server = '${server}'`;
  return await db.exec(set_server_prefix_str);  
}
module.exports.set_server_prefix = set_server_prefix;
//////
//// refactor to get_server_prop("alias")

const get_server_alias_str = `select value as alias from settings where id = 'alias' and server = ?`;
const get_server_alias_stmt = db.prepare(get_server_alias_str);

const get_server_alias = function (server) {
  var result =  get_server_alias_stmt.get(server);  
  return result.alias;
}
module.exports.get_server_alias = get_server_alias;

const set_server_alias = async function (alias,server) {
  const set_server_alias_str = `update settings set value = '${alias}' where id = 'alias' and server = '${server}'`;
  return await db.exec(set_server_alias_str);  
}
module.exports.set_server_alias = set_server_alias;
///// refactor to get_server_prop("channel")
////

const get_server_channel_str = `select value as channel from settings where id = 'channel' and server = ?`;
const get_server_channel_stmt = db.prepare(get_server_channel_str);

const get_server_channel = function (server) {
  var result =  get_server_channel_stmt.get(server);  
  return result.channel;
}
module.exports.get_server_channel = get_server_channel;

const set_server_channel = async function (channel,server) {
  const set_server_channel_str = `update settings set value = '${channel}' where id = 'channel' and server = '${server}'`;
  return await db.exec(set_server_channel_str);  
}
module.exports.set_server_channel = set_server_channel;
/*

const get_server_prop_str = `select value as prop from settings where id = ? and server = ?`;
const get_server_prop_stmt = db.prepare(get_server_prop_str);

const get_server_prop = function (prop,server) {
  var result =  get_server_prop_stmt.get(prop,server);  
  return result;
}
module.exports.get_server_prop = get_server_prop;

const set_server_prop = async function (prop,server) {
  const set_server_prop_str = `update settings set value = '${prop}' where id xxxx= 'prop' and server = '${server}'`;
  return await db.exec(set_server_prop_str);  
}
module.exports.set_server_prop = set_server_prop;
*/


/////
const is_server_admin_str = `select value as user from settings where id = 'admin-user' and server = ? and value = ?` ;
const is_server_admin_stmt = db.prepare(is_server_admin_str);

const is_server_admin = function (msg) {
  var result =  is_server_admin_stmt.get(msg.guild.name,msg.author.id);  
  return (typeof result !== 'undefined');
}
module.exports.is_server_admin = is_server_admin;


const get_server_admins_str = `select value as user from settings where id = 'admin-user' and server = ?` ;
const get_server_admins_stmt = db.prepare(get_server_admins_str);

const get_server_admins = function(guildname) {
  var result =  get_server_admins_stmt.all(guildname);  
  return (result);
}
module.exports.get_server_admins = get_server_admins;

const add_server_admin = function (server,user) {
  const add_server_admin_str = `INSERT INTO settings (server,value,id) VALUES ('${server}','${user}','admin-user');`;
  var result =  db.exec(add_server_admin_str);
  console.log(JSON.stringify(result));
  var result =  get_server_admins_stmt.all(server);  
  return (result);
  //return get_server_admins(server); 
}
module.exports.add_server_admin = add_server_admin;

const del_server_admin = function (server,user) {
  const del_server_admin_str = `DELETE FROM settings WHERE server = '${server}' AND value = '${user}';`;
  var result =  db.exec(del_server_admin_str);
  console.log(JSON.stringify(result));
  var result =  get_server_admins_stmt.all(server);  
  return (result);
}
module.exports.del_server_admin = del_server_admin;
