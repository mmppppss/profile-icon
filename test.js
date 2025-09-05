const draw = require('./index');
const fs = require('fs');

let username = "mmppppss";
const iconDark = draw.icon(username, 512, true, 64);
const icon = draw.icon(username, 512, false, 64);

fs.writeFileSync(`${username}.svg`, icon);
fs.writeFileSync(`${username}-dark.svg`, iconDark);
