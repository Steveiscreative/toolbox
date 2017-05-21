/**
 * Imports SCSS File(s)
 */
import "./scss/style.scss";

/**
 * Imports SVGs for SVG Sprite
 * Loops through files in SVG Directory and creates sprite map.
 */
let context = require.context('./', true, /\.(svg)$/);
let svgs = {};

context.keys().forEach((filename) => svgs[filename] = context(filename));



