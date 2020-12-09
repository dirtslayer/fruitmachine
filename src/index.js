const Discord = require('discord.js');
const settings = require('./settings');
const parse = require("discord-command-parser");
const player = require('./player');
const winnings = require('./winnings');
const emoji = require('./emoji');
const discord_key = require('./discord-key');
const client = new Discord.Client();

client.once('ready', (msg) => {
	console.log('Ready!');
	//
});

const NFRUITS = 5;
const PRIZE_AMOUNTS = [1, 5, 10, 50, 100];

async function spin(serverid, pid, pun) {

	const prizes = settings.get_server_prizes(serverid);

	if (!player.has_player(pid, serverid)) {
		player.add_player(serverid, 1000, 0, pun, pid);
	}
	const p = player.get_player(pid, serverid);
	outstr = "abc";
	var numbers = new Array(3)
	for (var i = 0; i < numbers.length; i++) {
		numbers[i] = Math.floor(Math.random() * NFRUITS);
	}
	outstr = prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' + prizes[numbers[2]];
	// win    
	if ((numbers[0] == numbers[1]) && (numbers[0] == numbers[2])) {
		//win
		//client.user.setActivity(outstr + ' ' + pun, { type: 3 });
		p.score += PRIZE_AMOUNTS[numbers[0]] - 1;
		player.update_player(p.score, p.highss, pun, pid, serverid);
		winnings.add_winnings(serverid, pid, prizes[numbers[0]]);
		outstr += '  +' + PRIZE_AMOUNTS[numbers[0]];
	} else {
		p.score = p.score - 1;
		player.update_player(p.score ,p.highss, pun, pid, serverid);
		outstr += ' ' + p.score;
	}
	console.log(pun + " " + outstr);
	return outstr;
}

function superspin(serverid, pid, pun) {

	const winning_indexs = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	const prizes = settings.get_server_prizes(serverid);

	if (!player.has_player(pid, serverid)) {
		player.add_player(serverid, 1000, 0, pun, pid);
	}

	const p = player.get_player(pid, serverid);
	
	outstr = "abc";

	var numbers = new Array(9)
	for (var i = 0; i < numbers.length; i++) {
		numbers[i] = Math.floor(Math.random() * NFRUITS);
	}

	outstr = '\n' + prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' + prizes[numbers[2]] + '\n' +
	prizes[numbers[3]] + ' ' + prizes[numbers[4]] + ' ' + prizes[numbers[5]] + '\n' +
	prizes[numbers[6]] + ' ' + prizes[numbers[7]] + ' ' + prizes[numbers[8]] ;
	// win    
	p.score = p.score - 10; // super spin cost
	var spin_outcome = 0;

	winning_indexs.forEach(element => {
	if ((numbers[element[0]] == numbers[element[1]]) && (numbers[element[0]] == numbers[element[2]])) {
		spin_outcome += PRIZE_AMOUNTS[numbers[element[0]]];
		winnings.add_winnings(serverid, pid, prizes[numbers[element[0]]]);
		outstr += '  +' + PRIZE_AMOUNTS[numbers[element[0]]];
	} 
});
	if (spin_outcome > p.highss) {
		p.highss = spin_outcome;
	}
	p.score += spin_outcome;
	player.update_player(p.score, p.highss , pun, pid, serverid);
	outstr += ' ' + p.score;
	console.log(pun + " " + outstr);
	return outstr;
}

async function showprizes(serverid) {
	//const serv = settings.get_server(serverid);
	const prizes = settings.get_server_prizes(serverid);
	outstr = "";
	for (var i = 0; i < NFRUITS; i++) {
		outstr += '\n' + prizes[i] + ' ' + prizes[i] + ' ' + prizes[i] + '  +' + PRIZE_AMOUNTS[i];
	}
	return outstr;
}

async function showtop10(serverid) {
	outstr = "\n```python\n";
	outstr += "#     FruitMachine Top 10 - " + serverid;
	var results = player.server_top10(serverid);

	for (var i = 0; i < results.length; i++) {
		outstr += '\n' + (i + 1).toString().padStart(3) + ' ';
		outstr += results[i].name.padStart(33, '.') + ' ';
		outstr += results[i].score;
	}
	//console.log('t10: ' + outstr);
	outstr += "\n```";
	return outstr;
}

async function showglobal() {
	outstr = "\n```python\n";
	outstr += "#     FruitMachine Global Leaderboard"; // 37 chars
	var results = player.global();
	for (var i = 0; i < results.length; i++) {
		outstr += '\n' + (i + 1).toString().padStart(3) + ' ';
		outstr += results[i].name.padStart(33, '.') + ' ';
		outstr += results[i].score.toString().padStart(8, '.') + ' ';;
		outstr += results[i].server;
	}
	outstr += "\n```";
	return outstr.substr(0,1995);
}

async function stats(pid, serverid) {
	var p = player.get_player(pid, serverid);
	var outstr = "score: " + p.score + ' high super spin: ' + p.highss + ' prizes: ';
	var curprizes = winnings.get_player_winnings(serverid, pid);
	for (const [key, value] of Object.entries(curprizes)) {
		outstr += `${value.prize}`;
	}
	return outstr;
}

const allowed_admin = function(message) {
	if (settings.is_server_admin(message)) return true;
	if (message.member.hasPermission('ADMINISTRATOR')) return true;
	return false;
}

client.on('message', async message => {
	const message_guild_name = message.guild.name;
	
	var server_settings;
	var prefix;
	try {
		server_settings = settings.get_server_settings(message_guild_name);
		prefix = settings.get_server_prefix(message_guild_name);
	} catch (error) {
		settings.new_server(message_guild_name);
		server_settings = settings.get_server_settings(message_guild_name);
		prefix = settings.get_server_prefix(message_guild_name);
	}
	const channel_setting = settings.get_server_channel(message_guild_name);
	if ( channel_setting !== 'false') {
		var ok = false;
		if (channel_setting === message.channel.name) ok = true;
		if (channel_setting === '<#'+ message.channel.id + '>') ok = true;
		if (!ok) return;
	}
	const alias_setting  = settings.get_server_alias(message_guild_name);
	if (alias_setting != 'false') {
		const mcl = message.content.toLowerCase();
		if ((mcl === 'spin') || (mcl === 's')) {
			var spinres = await spin(message_guild_name, message.author.id, message.member.displayName);
			return message.reply(spinres);
		}
		if ((mcl === 'sss') || (mcl === 'ss') ) {
			var spinres = await superspin(message_guild_name, message.author.id, message.member.displayName);
			return message.reply(spinres);
		}

	} 
	const parsed = parse.parse(message, prefix, { allowSpaceBeforeCommand: true });
	if (!parsed.success) return;
	if (parsed.command === "invite") return message.reply('\n<https://discord.com/api/oauth2/authorize?client_id=780118548760625163&permissions=2048&scope=bot>');
	if (parsed.command === "spin") {
		var spinres = await spin(message_guild_name, message.author.id, message.member.displayName);
		return message.reply(spinres);
	}
	if (parsed.command === "ss") {
		var spinres = await superspin(message_guild_name, message.author.id, message.member.displayName);
		return message.reply(spinres);
	}
	if (parsed.command === "prizes") return message.reply(await showprizes(message_guild_name));
	if (parsed.command === "top10") return message.reply(await showtop10(message_guild_name));
	if (parsed.command === "global") return message.reply(await showglobal());
	if (parsed.command === "stats") return message.reply(await stats(message.author.id, message_guild_name));
	if (parsed.command === "set") {
		
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
			
		const whichslot = parsed.reader.getInt();
		var newchar = parsed.reader.getString();
		if ( (newchar==null) || (newchar.length==0) ) {
			newchar = emoji.re();
		}
		const toret = await settings.set_prize(newchar, whichslot, message_guild_name);
		return message.reply(await showprizes(message_guild_name));

	}
	if (parsed.command === "prefix") {
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
		const newprefix = parsed.reader.getString();
		if ( (newprefix==null) || (newprefix.length==0) ) {
			return message.reply(prefix +'admin-help');
		}
		const toret = await settings.set_server_prefix(newprefix, message_guild_name);
		return message.reply(await settings.get_server_prefix(message_guild_name));
	}
	if (parsed.command === "alias") {
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
		const boolstr = parsed.reader.getString();
		if ( (boolstr==null) || (boolstr.length==0) ) {
			return message.reply(prefix +'admin-help');
		}
		const toret = await settings.set_server_alias(boolstr, message_guild_name);
		return message.reply(await settings.get_server_alias(message_guild_name));
	}
	if (parsed.command === "channel") {
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
		var channelstr = parsed.reader.getString();
		//channelstr = channelstr.trimLeft('<#');
		//channelstr = channelstr.trimRight('>');
		console.log('channelstr : ' + channelstr);
		if ( (channelstr==null) || (channelstr.length==0) ) {
			return message.reply(prefix +'admin-help');
		}
		const toret = await settings.set_server_channel(channelstr, message_guild_name);
		return message.reply(await settings.get_server_channel(message_guild_name));
	}
	if (parsed.command === "admin-user-list") {
		console.log('admin user list');
		var outstr = '';
		var admins_id = settings.get_server_admins(message_guild_name);
		admins_id.forEach(element => {
			console.log('each admin: ' + element.user);
			const User = client.users.cache.get(element.user); // Getting the user by ID.
			if (User) { // Checking if the user exists.
				outstr += User.tag + ' '; // The user exists.
			} else {
				outstr += JSON.stringify(User);
			};
		});
		return message.reply(outstr);
	}
	if (parsed.command === "admin-user-add") {
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
		var userstr = parsed.reader.getString();
		if (userstr.startsWith('<@!')) {
			userstr = userstr.substr(3,userstr.length-4);
		} 
		if ( (userstr==null) || (userstr.length==0) ) {
			return message.reply(prefix +'admin-help');
		}
		const outcome =  settings.add_server_admin(message_guild_name,userstr);
		return settings.get_server_admins(message_guild_name);
	}
	if (parsed.command === "admin-user-del") {
		if (!allowed_admin(message)) {
			return message.reply('sorry, not admin');
		}
		var userstr = parsed.reader.getString();
		if (userstr.startsWith('<@!')) {
			userstr = userstr.substr(3,userstr.length-4);
		} 
		if ( (userstr==null) || (userstr.length==0) ) {
			return message.reply(prefix +'admin-help');
		}
		const outcome =  settings.del_server_admin(message_guild_name,userstr);
		return settings.get_server_admins(message_guild_name);
	}


	if (parsed.command === "help") {
		var helpson = {
			'spin': 'Chance to win a prize (cost 1)',
			'ss' : '8 chances to win (cost 10)',
			'prizes': 'Displays prizes',
			'stats': 'Shows your score and more',   // inventory w/l
			'top10': `${message_guild_name} leaders`,
			'global': 'Global leaders',
			'help': 'https://discord.gg/pZwqzqGYey',
			'invite': 'Displays an invite link',
			'admin-help': 'Displays admin commands'
		};
		var helpstr = '```txt\n';
		for (const [key, value] of Object.entries(helpson)) {
			helpstr += `\n${key.padStart(12, ' ')}: ${value}`;
		}
		helpstr += '\n```';
		return message.reply(helpstr);
	}

	if (parsed.command === "admin-help") {
		var adminhelpson = {
			'set [0-4] [emojii]': 'set prize, 0-4, optional emojii',
			'alias [true|false]': 'enable s or S for spin',
			'channel [channel|false]': 'restrict to channel',
			'prefix *': 'change prefix to *',
			'prefix fm-': 'reset prefix to fm-',
			'admin-user-add': 'add admin',
			'admin-user-del' : 'del admin',
			'admin-user-list' : 'list admins'
		};
		
			var helpstr = '```txt\n';
			for (const [key, value] of Object.entries(adminhelpson)) {
				helpstr += `\n${key.padStart(20, ' ')}: ${value}`;
			}
			helpstr += '\n```';
			return message.reply(helpstr);
	}
});

client.login(discord_key.discord_key);
