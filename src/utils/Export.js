import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import store from '../models/CanvasStore'

export function exportJpg() {
	
	let scale = 'scale('+store.exportSizeMultiplier+')'
	let style = {
	  transform: scale,
	  'transform-origin': 'top left',
	};

	domtoimage.toBlob(document.getElementById('canvas'), {
			style: style, 
			height: Number(store.heightPixels) * Number(store.exportSizeMultiplier),
			width: Number(store.widthPixels) * Number(store.exportSizeMultiplier)
		})
		.then(function (blob) {
			FileSaver.saveAs(blob, store.fileName + ".png");
		})
}