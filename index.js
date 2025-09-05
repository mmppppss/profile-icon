// PRNG con semilla
function mulberry32(seed) {
    let seedN = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return function() {
        let t = seedN += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}
/**
*	return a rgb hex (dark or light) based in random function 
*   
*   @param {mulberry32} rand - function to get repetible random number
*   @param {boolean} [darkmode=false] - is in dark module
*	@returns {string} hex rgb value
*	
*/
function randomColor(rand, darkmode = false) {
    let min = darkmode ? 0 : 100;
    let max = darkmode ? 150 : 255;

    const r = Math.floor(rand() * (max - min) + min);
    const g = Math.floor(rand() * (max - min) + min);
    const b = Math.floor(rand() * (max - min) + min);

    return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
}


function generatePalette(rand, count = 5, darkmode = false) {
    return Array.from({ length: count }, () => randomColor(rand, darkmode));
}


/**
	* @param {string} seed 
	* @param {int} size - size of the result
	* @param {boolean} [darkMode=false] - is in dark mode?
	* @param {number} [cellSize=20] - size of the individual cell inside the canvas
	*
	* @returns {string} - SVG code of the icon 
	*
	*/
function icon(seed, size,  darkMode = false, cellSize = 20) {
    const rand = mulberry32(seed);
    const palette = generatePalette(rand, 5, darkMode);

    const width = size;
    const height = size;
	const bgColor = darkMode ? "#282828" : "#f2f2f2";

    let shapes = "";

    const cols = Math.floor(width / (2 * cellSize));
    const rows = Math.floor(height / (2 * cellSize));

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const val = Math.sin((x * y) / seed.length) + (Math.cos(x + y));

            const norm = (val + 2) / 4; 

            if (norm < 0.5) continue; 

            const index = Math.floor(norm * palette.length) % palette.length;
            const color = palette[index];

            const positions = [
                [x * cellSize, y * cellSize],
                [width - (x + 1) * cellSize, y * cellSize],
                [x * cellSize, height - (y + 1) * cellSize],
                [width - (x + 1) * cellSize, height - (y + 1) * cellSize],
            ];

            positions.forEach(([px, py]) => {
                shapes += `<rect x="${px}" y="${py}" width="${cellSize}" height="${cellSize}" fill="${color}" />`;
            });
        }
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        ${shapes}
    </svg>
    `;

    return svg;
}

/**
	* @param {string} seed 
	* @param {int} size - size of the result
	* @param {boolean} [darkMode=false] - is in dark mode?
	* @param {number} [cellSize=20] - size of the individual cell inside the canvas
	*
	* @returns {string} - base64 encode of the icon 
	*
	*/
function iconB64(seed, size,  darkMode = false, cellSize = 20) {
	return btoa(encodeURIComponent(icon(seed, size, darkMode, cellSize).toString("base64")))
}

module.exports = {
	icon,
	iconB64
}
