# Vectorial SVG icon generate



```
// ejemplo
const pi = require("profile-icon")
const fs = require("fs");
let seed = "mps";
const buffer = pi.icon(seed, 400, true, 40);
fs.writeFileSync(seed+"-symmetry.svg", buffer);

```
