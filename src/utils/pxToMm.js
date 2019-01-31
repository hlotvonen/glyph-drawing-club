export function pxToMm(val, dpi) {
	return ((val/0.0393701)/dpi).toFixed(2)
}
