import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';

class GlyphSelect extends Component {
    constructor(props) {
		super(props);
		this.drawNext = this.drawNext.bind(this);
		this.onDrop = this.onDrop.bind(this);

	    this.state = {
	      off: 0,
	      font: [],
	      num: 100,
	      gid: 0,
	      uncd: null
	    };
    }
    componentDidMount() {
		this.go();
    }
    go = () => {  
		//load("unscii-16.ttf",fontLoaded);
		this.load("unscii-16.ttf", this.fontLoaded);  
		
		this.node = document.body;
		this.node.addEventListener("drop", this.onDrop, false);
		this.node.addEventListener("dragenter", this.cancel, false);
		this.node.addEventListener("dragleave", this.cancel, false);
		this.node.addEventListener("dragover", this.cancel, false);
	}
    load(path, resp) {
		let request = new XMLHttpRequest();
		request.open("GET", path, true);
		request.responseType = "arraybuffer";
		request.onload = function(e){resp(e.target.response);};
		request.send();
	}
	cancel(e) {  
		e.stopPropagation(); 
		e.preventDefault();  
	}
	fontLoaded = (resp) => {
		this.setState({ 
			font: Typr.parse(resp)
		});

		this.setState({ 
			uncd: new Array(this.state.font.maxp.numGlyphs)
		});
		for(let i=0; i<100000; i++) {
			let gid = Typr.U.codeToGlyph(this.state.font, i);  
			if(gid==0) continue;
			if(this.state.uncd[gid]==null) this.state.uncd[gid]=[i];
			else this.state.uncd[gid].push(i);
		}

		this.setState({ off: 0 });
		this.setState({ gid: 0 });
		
		this.drawGlyphs();
	}
	drawGlyphs = () => {
		let cont = document.getElementById("glyphcont");  
			cont.innerHTML = "";
		let cnv = document.createElement("canvas");  
			cnv.width = Math.floor(this.getDPR()*40);  
			cnv.height = Math.floor(this.getDPR()*60);  //scaleCnv(cnv);
		let ctx = cnv.getContext("2d");
			ctx.font="20px sans";
		
		let lim = Math.min(this.state.off+this.state.num, this.glyphCnt());
		let scale = 32*this.getDPR() / this.state.font.head.unitsPerEm;
		for(let i=this.state.off; i<lim; i++)
		{
			let path = Typr.U.glyphToPath(this.state.font, i);
			
			cnv.width = cnv.width;
			//ctx.scale(getDPR(), getDPR());
			ctx.translate(10*this.getDPR(),Math.round(36*this.getDPR()));  
			
			ctx.fillStyle = "#000000";
			ctx.fillText(i,0,20);
			
			ctx.scale(scale,-scale);
			Typr.U.pathToContext(path, ctx);
			ctx.fill();
			
			let img = document.createElement("img");
			img.setAttribute("style", "width:"+(cnv.width/this.getDPR())+"px; height:"+(cnv.height/this.getDPR())+"px");
			img.gid = i;
			img.onclick = this.glyphClick;
			img.src = cnv.toDataURL();
			cont.appendChild(img);
		}
	}
	onDrop = (e) => { 
		this.cancel(e);
		let fontLoaded = this.fontLoaded;
		let r = new FileReader();
		r.onload = function(e) { fontLoaded(e.target.result); };
		r.readAsArrayBuffer( e.dataTransfer.files[0] );
	}
	glyphClick = (e) => { 
		this.setState({ gid: e.target.gid });
		this.displayUnicode(); 
	}
	displayUnicode() {	
		let props = document.getElementById("properties");
		let hex = "---", str = "---";
		let ucode = this.state.uncd[this.state.gid];
		if(ucode!=null) {  
			hex=ucode[0].toString(16);  
			while(hex.length<4) hex="0"+hex;
			str=String.fromCharCode(ucode[0]);
		}
		props.innerHTML = "Selected glyph: #"+hex+" <span> "+str+"</span>";
		store.selectedUnicode = ucode[0];
	}
	getDPR() { 
		return window["devicePixelRatio"] || 1; 
	}
    glyphCnt = () => {
    	return this.state.font.maxp.numGlyphs;
    }
    drawNext = () => {
		if(this.state.off+this.state.num<this.glyphCnt()) this.state.off = this.state.off + this.state.num;
		this.drawGlyphs();
    }
	drawPrev = () => {
		if(this.state.off>0) this.state.off = this.state.off-this.state.num; 
		this.drawGlyphs();
	}
	render() {
		return (
			<div className="glyphs">
				<h3>Glyphs</h3>
				<button type="button" onClick={this.drawPrev}>Previous 100</button><button type="button" onClick={this.drawNext}>Next 100</button>
				<b>Drag and drop a font file (otf/ttf)</b>
				<div id="glyphcont"></div>
				<div id="properties"></div>
				
			</div>
		);
	}
}
export default observer(GlyphSelect);

