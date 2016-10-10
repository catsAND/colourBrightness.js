/*
 *  colourBrightness.js
 *
 *  Copyright 2013-2016, Jamie Brittain - http://jamiebrittain.com
 *  Copyright 2016, catsAND
 *  Released under the WTFPL license
 *  http://sam.zoy.org/wtfpl/
 *
 *  Github:  https://github.com/catsAND/colourBrightness.js
 *  Version: 2.0
 */

(function() {
	window.colourBrightness = function(elem) {
		function getBackgroundColor(el) {
			while(el.tagName.toLowerCase() != 'html') {
				var style = el.style.length === 0 ? window.getComputedStyle(el) : el.style;
				if(style.backgroundColor != 'rgba(0, 0, 0, 0)' && style.backgroundColor != 'transparent') {
					break;
				}
				el = el.parentElement;
			}
			return style.backgroundColor;
		}

		var r,g,b,brightness, colour = getBackgroundColor(elem);

		if (colour.match(/^rgb/)) {
			colour = colour.match(/rgba?\(([^)]+)\)/)[1];
			colour = colour.split(/ *, */).map(Number);
			r = colour[0];
			g = colour[1];
			b = colour[2];
		} else if ('#' == colour[0] && 7 == colour.length) {
			r = parseInt(colour.slice(1, 3), 16);
			g = parseInt(colour.slice(3, 5), 16);
			b = parseInt(colour.slice(5, 7), 16);
		} else if ('#' == colour[0] && 4 == colour.length) {
			r = parseInt(colour[1] + colour[1], 16);
			g = parseInt(colour[2] + colour[2], 16);
			b = parseInt(colour[3] + colour[3], 16);
		}

		brightness = (r * 299 + g * 587 + b * 114) / 1000;

		if (brightness < 125) {
			// white text
			elem.classList.add('dark');
			elem.classList.remove('light');
		} else {
			// black text
			elem.classList.add('light');
			elem.classList.remove('dark');
		}
		return elem;
	};
})();
