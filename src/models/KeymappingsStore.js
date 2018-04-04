import { action, observable, mobx, toJS } from 'mobx';
import store from './CanvasStore'

class KeymappingsStore {
	constructor() {
		this.sets = Array.from({length: this.setNumber}, () => Array.from({length: this.keys.length}, () => ["0"] )); 
	}
	
	keys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F9', 'F10', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
	


	/*let Sets = observable([
		key:"lol",
		glyphPath: "sdfsdf",
		svgWidth: "adfsdf",
		svgHeight: "4dfsd",
		svgBaseline: "6ds"
	]);*/

	@observable setNumber = 1;
	@observable toggleMapping = false;
	@observable selectedSet = 1;

	//Toggle Hide Grid
	handleChangeMapping = () => { 
		this.toggleMapping = !this.toggleMapping;
	}
	addSet = (e) => {
		//this.sets.push();
	    console.log(this.sets[0].key);
	}


}

export default new KeymappingsStore();

