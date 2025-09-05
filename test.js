const draw = require('./index');
const fs = require('fs');

let username = "mmppppss";
const iconDark = draw.icon(username, 512, true, 64);
const icon = draw.icon(username, 512, false, 64);
const iconb = draw.iconB64(username, 512, false, 64);

console.log(iconb)
fs.writeFileSync(`${username}.svg`, icon);
fs.writeFileSync(`${username}-dark.svg`, iconDark);
