/**
 * Imports SCSS File(s)
 */
import "./scss/style.scss";

/**
 * Imports SVGs for SVG Sprite
 * Loops through files in SVG Directory and creates sprite map.
 */

var context = require.context('./', true, /\.(svg)$/);
var svgs = {};

context.keys().forEach((filename) => svgs[filename] = context(filename));



