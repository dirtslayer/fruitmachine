'use strict';
const hp = require('./player');

console.log(hp.get_player('352485891220176899'));
console.log(hp.get_player('0'));
console.log(hp.has_player('352485891220176899'));
console.log(hp.has_player('0'));
if (hp.has_player("232323")) {
    console.log(hp.del_player("232323"));
}

if (!hp.has_player('wayneid')) {
    console.log( hp.add_player ( 99,'Wayne','wayneid'));
}

console.log(hp.update_player(444,'Marshall','wayneid'));
console.log(hp.add_to_score(-111,'wayneid'));

console.log(hp.top10());

