'use strict';

const basic_emojii = ['⌚','⌛','⏩','⏬','⏰','⏳','◽','◾','☔','☕','♈','♓','♿','⚓','⚡','⚪','⚫',
'⚽','⚾','⛄','⛅','⛎','⛔','⛪','⛲','⛳','⛵','⛺','⛽','✅','✊','✋','✨','❌','❎','❓','❕','❗','➕',
'➗','➰','➿','⬛','⬜','⭐','⭕','🀄','🃏','🆎','🆑','🆚','🈁','🈚','🈯','🈲','🈶','🈸','🈺','🉐',
'🉑','🌀','🌌','🌍','🌎','🌏','🌐','🌑','🌒','🌓','🌕','🌖','🌘','🌙','🌚','🌛','🌜','🌝','🌞','🌟',
'🌠','🌭','🌯','🌰','🌱','🌲','🌳','🌴','🌵','🌷','🍊','🍋','🍌','🍏','🍐','🍑','🍻','🍼','🍾','🍿',
'🎀','🎓','🎠','🏄','🏅','🏆','🏇','🏈','🏉','🏊','🏏','🏓','🏠','🏣','🏤','🏥','🏰','🏴','🏸','🐇','🐈',
'🐉','🐋','🐌','🐎','🐏','🐐','🐑','🐒','🐓','🐔','🐕','🐖','🐗','🐩','🐪','🐫','🐾','👀','👂','👤','👥',
'👦','👫','👬','👭','👮','💬','💭','💮','💵','💶','💷','💸','📫','📬','📭','📮','📯','📰','📴','📵','📶',
'📷','📸','📹','📼','📿','🔂','🔃','🔄','🔇','🔈','🔉','🔊','🔔','🔕','🔖','🔫','🔬','🔭','🔮','🔽','🕋',
'🕎','🕐','🕛','🕜','🕧','🕺','🖕','🖖','🖤','🗻','🗿','😀','😁','😆','😇','😈','😉','😍','😎','😏','😐',
'😑','😒','😔','😕','😖','😗','😘','😙','😚','😛','😜','😞','😟','😠','😥','😦','😧','😨','😫','😬','😭',
'😮','😯','😰','😳','😴','😵','😶','😷','🙀','🙁','🙄','🙅','🙏','🚀','🚁','🚂','🚃','🚅','🚆','🚇','🚈',
'🚉','🚊','🚋','🚌','🚍','🚎','🚏','🚐','🚑','🚓','🚔','🚕','🚖','🚗','🚘','🚙','🚚','🚛','🚡','🚢','🚣',
'🚤','🚥','🚦','🚧','🚭','🚮','🚱','🚲','🚳','🚵','🚶','🚷','🚸','🚹','🚾','🚿','🛀','🛁','🛅','🛌','🛐',
'🛑','🛒','🛕','🛖','🛗','🛫','🛬','🛴','🛶','🛷','🛸','🛹','🛺','🛻','🛼','🟠','🟫','🤌','🤍','🤏','🤐',
'🤘','🤙','🤞','🤟','🤠','🤧','🤨','🤯','🤰','🤱','🤲','🤳','🤺','🤼','🤾','🤿','🥀','🥅','🥇','🥋','🥌',
'🥍','🥏','🥐','🥞','🥟','🥫','🥬','🥰','🥱','🥲','🥳','🥶','🥷','🥸','🥺','🥻','🥼','🥿','🦀','🦄','🦅',
'🦑','🦒','🦗','🦘','🦢','🦣','🦤','🦥','🦪','🦫','🦭','🦮','🦯','🦰','🦹','🦺','🦿','🧀','🧁','🧂','🧃',
'🧊','🧋','🧍','🧏','🧐','🧦','🧧','🧿','🩰','🩳','🩴','🩸','🩺','🪀','🪂','🪃','🪆','🪐','🪕','🪖','🪨',
'🪰','🪶','🫀','🫂','🫐','🫖','©️','®️','‼️','⁉️','™️','ℹ️','↔️','↕️','↖️','↗️','↘️','↙️','↩️','↪️','⌨️','⏏️','⏭️','⏮️','⏯️',
'⏱️','⏲️','⏸️','⏹️','⏺️','Ⓜ️','▪️','▫️','▶️','◀️','◻️','◼️','☀️','☁️','☂️','☃️','☄️','☎️','☑️','☘️','☝️','☠️','☢️','☣️','☦️','☪️',
'☮️','☯️','☸️','☹️','☺️','♀️','♂️','♟️','♠️','♣️','♥️','♦️','♨️','♻️','♾️','⚒️','⚔️','⚕️','⚖️','⚗️','⚙️','⚛️','⚜️','⚠️','⚧️','⚰️','⚱️',
'⛈️','⛏️','⛑️','⛓️','⛩️','⛰️','⛱️','⛴️','⛷️','⛸️','⛹️','✂️','✈️','✉️','✌️','✍️','✏️','✒️','✔️','✖️','✝️','✡️','✳️','✴️','❄️','❇️',
'❣️','❤️','➡️','⤴️','⤵️','⬅️','⬆️','⬇️','〰️','〽️','㊗️','㊙️','🅰️','🅱️','🅾️','🅿️','🈂️','🈷️','🌡️','🌤️','🌥️','🌦️','🌧️','🌨️','🌩️',
'🌪️','🌫️','🌬️','🌶️','🍽️','🎖️','🎗️','🎙️','🎚️','🎛️','🎞️','🎟️','🏋️','🏌️','🏍️','🏎️','🏔️','🏕️','🏖️','🏗️','🏘️','🏙️','🏚️','🏛️','🏜️',
'🏝️','🏞️','🏟️','🏳️','🏵️','🏷️','🐿️','👁️','📽️','🕉️','🕊️','🕯️','🕰️','🕳️','🕴️','🕵️','🕶️','🕷️','🕸️','🕹️','🖇️','🖊️','🖋️','🖌️','🖍️',
'🖐️','🖥️','🖨️','🖱️','🖲️','🖼️','🗂️','🗃️','🗄️','🗑️','🗒️','🗓️','🗜️','🗝️','🗞️','🗡️','🗣️','🗨️','🗯️','🗳️','🗺️','🛋️','🛍️','🛎️','🛏️',
'🛠️','🛡️','🛢️','🛣️','🛤️','🛥️','🛩️','🛰️','🛳️'];

const re = function() {
    const len = basic_emojii.length;
    const index = Math.floor(Math.random() * len);
    return basic_emojii[index];
}
module.exports.re = re;

const all = function() {
    //const len = basic_emojii.length;
    //const index = Math.floor(Math.random() * len);
    var outstr = '';
    basic_emojii.forEach(element => {
        //console.log(element);
        outstr += '  ' + element;
    });
    return outstr;
    
}

//console.log(re()+re()+re()+re()+re()+re()+re()+re()+re()+re()+re()+re()+re());

//console.log(all());