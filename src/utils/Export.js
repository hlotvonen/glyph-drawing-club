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
			height: store.heightPixels * store.exportSizeMultiplier,
			width: store.widthPixels * store.exportSizeMultiplier
		})
		.then(function (blob) {
			FileSaver.saveAs(blob, store.fileName + ".jpg");
		})
}