export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

export const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export const colorBlend = (a, b, intensity) => {
	intensity = typeof intensity === 'undefined' ? 1 : intensity
	return a.reduce(function (result, current, index) {
		let value = (a[index] < 128) ? (2 * b[index] * a[index] / 255) : (255 - 2 * (255 - a[index]) * (255 - b[index]) / 255)
		value = (value * intensity + (a[index] * (1 - intensity)))
		return result.concat(Math.min(Math.round(value), 255))
	}, [])
}

/**
 * Takes HSL values (H between 0 and 360, S and L each between 0 and 100) and returns the corresponding RGB values (each between 0 and 255)
 * Based on pseudo-code in the W3 Color Model document (http://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color)
 */
export const hslToRgb = (h, s, l) => {
	let m1, m2, m3, r, g, b;

	h = h / 360;
	s = s / 100;
	l = l / 100;

	m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;

	m1 = l * 2 - m2;

	r = hueToRgb(m1, m2, h + 1/3);
	g = hueToRgb(m1, m2, h);
	b = hueToRgb(m1, m2, h - 1/3);

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export const hueToRgb = (m1, m2, h) => {
	if(h < 0) {
		h = h + 1;
	} else if(h > 1) {
		h = h - 1;
	}

	if(h*6 < 1) {
		return m1 + (m2 - m1) * h * 6;
	} else if(h*2 < 1) {
		return m2;
	} else if(h*3 < 2) {
		return m1 + (m2 - m1) * (2/3 - h) * 6
	}

	return m1;
}

/**
 * Takes RGB values (each between 0 and 255) and returns the corresponding HSL values (H between 0 and 360, S and L each between 0 and 100).
 * Based on http://stackoverflow.com/a/9493060
 */
export const rgbToHsl = (r, g, b) => {
	let max, min, h, s, l;

	r = r / 255;
	g = g / 255;
	b = b / 255;

	max = Math.max(r, g, b);
	min = Math.min(r, g, b);

	l = (min + max) / 2;

	let diff = max - min;

	if (diff == 0) {
		s = 0;
		h = 0;
	} else {
		if(l > 0.5) {
			s = (diff) / (2 - min - max)
		} else {
			s = diff / (max + min)
		}

		switch(max) {
			case r:
				h = (g - b) / diff + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / diff + 2;
				break;
			case b:
				h = (r - g) / diff + 4;
				break;
		}
	}

	return [Math.round(h * 60), Math.round(s * 100), Math.round(l * 100)];
}