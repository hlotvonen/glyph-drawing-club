import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import store from '../models/CanvasStore.js';

const pagenumber = observable(0);

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
	      uncd: null,
	      fontfile: "",
	      pages_total: 0
	    };
    }
    componentDidMount() {
		this.go();
    }
    go = () => {  
		this.load("Tesserae-Regular.otf", this.fontLoaded);

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

		this.setState({ 
			gid: 0,
			off: 0,
			pages_total: Math.floor(this.glyphCnt() / this.state.num)
		});
		
		this.drawGlyphs();
		this.glyphToSVG();

		pagenumber.set(0);

		store.fontName = this.state.font.name.fullName;

	}
	glyphToSVG = () => {
		let path = Typr.U.glyphToPath(this.state.font, this.state.gid);
		let svgstring = Typr.U.pathToSVG(path);
		store.glyphPath = svgstring;
		store.svgWidth = this.state.font.hhea.advanceWidthMax;
		//store.svgwidth = this.state.font.hmtx.aWidth[this.state.gid];
		store.svgHeight = this.state.font.hhea.ascender + Math.abs(this.state.font.hhea.descender);
		store.svgBaseline = this.state.font.hhea.descender;
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
		let r64 = new FileReader();
		let file = e.dataTransfer.files[0];
		r.onload = function(e) { fontLoaded(e.target.result); };
		r.readAsArrayBuffer( file );
		r.onloadend = function(e) {
		    r64.readAsDataURL( file )
		    r64.onloadend = function(e) {
		    	let base64result = r64.result.split(',')[1];
		    	//Set font face
				let newStyle = document.createElement('style');
				newStyle.appendChild(document.createTextNode("\
				@font-face {\
				    font-family: 'thefont';\
				    src: url(data:application/x-font-ttf;charset=utf-8;base64," + base64result + ");\
				}\
				"));
				document.head.appendChild(newStyle);
				store.selectedFont = "thefont";
		    }
		};
	}
	glyphClick = (e) => { 
		this.setState({ gid: e.target.gid });
		this.displayUnicode();
		this.glyphToSVG();
	}
	displayUnicode() {	
		let props = document.getElementById("properties");
		let hex = "---", 
			str = "---";
		let ucode = this.state.uncd[this.state.gid];
		if(ucode!=null) {  
			hex=ucode[0].toString(16);  
			while(hex.length<4) hex="0"+hex;
			str=String.fromCharCode(ucode[0]);
			//update unicode number in the store
			store.selectedUnicode = ucode[0];
		}
		props.innerHTML = "Selected glyph: Hex: #"+hex+" and Dec: #"+ucode+" <span> "+str+"</span>";
		
	}
	getDPR() { 
		return window["devicePixelRatio"] || 1; 
	}
    glyphCnt = () => {
    	return this.state.font.maxp.numGlyphs;
    }
    drawNext = () => {
		if(this.state.off+this.state.num<this.glyphCnt()) {
			this.state.off = this.state.off + this.state.num;
		}
		pagenumber.set(pagenumber + 1);
		console.log(pagenumber);
		this.drawGlyphs();
    }
	drawPrev = () => {
		if(this.state.off>0) {
			this.state.off = this.state.off-this.state.num;
		}
		pagenumber.set(this.state.off / this.state.num);
		this.drawGlyphs();
	}
	updatePageNum = (evt) => {
		pagenumber.set(evt.target.value);
		this.state.off = pagenumber * this.state.num;
		this.drawGlyphs();

		// If input is invalid, give input error class, and show last page
		var page_select_input = document.getElementById("page_select_input");
	 	page_select_input.className = page_select_input.className.replace("input-error", "");
        if (isNaN(evt.target.value) || evt.target.value > this.state.pages_total) {
            page_select_input.className += " input-error ";
            this.state.off = this.state.pages_total * this.state.num;
            this.drawGlyphs();
        }
	}	
	render() {
		return (
			<div className="glyphs">
				<h3>Glyph selection</h3> 
				<b>To load another font, drop a font file (otf/ttf)</b>
				<div>Currently selected font: {store.fontName}</div>
				<button type="button" onClick={this.drawPrev}>Previous</button>
				<button type="button" onClick={this.drawNext}>Next</button>
				<div className="page_selection">
					Select page: 
					<input 
						id="page_select_input"
						type="number"
						min="0" 
						max={this.state.pages_total}
						value={pagenumber}
						onChange={evt => this.updatePageNum(evt)}
					/>/{this.state.pages_total}
				</div>
				<div id="glyphcont"></div>
				<button type="button" onClick={this.drawPrev}>Previous</button>
				<button type="button" onClick={this.drawNext}>Next</button>
			</div>
		);
	}
}
export default observer(GlyphSelect);

