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
			FileSaver.saveAs(blob, 'unscii-art.jpg');
		})
}

/*
TODO: Correct SVG saving
SVG saving doesn't really work with this. 
The output is html inside an svg tag and is displayed incorrectly in all vector programs etc. 
The file size is a whopping 4,5mb for just an empty canvas, because of uneccessary styling (don't know where it comes from).


function filter (node) {
    return (node.attributes !== 'style');
}
export function saveAsSvg() {
	domtoimage.toSvg(document.getElementById('canvas'), {filter: filter})
	  .then(function(dataUrl) {
	    fetch(dataUrl)
			.then(res => res.blob())
	    .then(blob => FileSaver.saveAs(blob, 'my-node.svg'))
	  })

	  .catch(function(e) {
	    console.log(e);
	  })
}
*/