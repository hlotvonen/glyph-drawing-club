import localforage from "localforage";
import { action, autorun, makeObservable, observable, runInAction } from "mobx";
import { createElement } from "react";
import { render } from "react-dom";
import { svgAsPngUri } from "save-svg-as-png";
import store from "../models/CanvasStore";
import { cellsAsTransparentSvg } from "../utils/cellsAsSvg";


const EMPTY_BASE64 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

class ReferenceStore {

	constructor() {
		makeObservable(this)

    localforage.getItem("referenceStorage")
			.then((value) => {
				if(!value) {
					throw "Nothing in referenceStorage"
				}
				//load from localforage if it's not the first time
				runInAction(() => {
					this.init(JSON.parse(value))
				})
			})
			.catch((err) => {
				// This code runs if there were any errors
				console.log(err)
			})

		//set localforage, autorun will update it every time something changes
		autorun(() => {
			if (this.referenceImageList.length) {
				let referenceStorage = {
					name: "Reference Images",
					timestamp: Math.floor(Date.now() / 1000),
					referenceImageList: this.referenceImageList,
				}
				localforage.setItem("referenceStorage", JSON.stringify(referenceStorage))
			}
		}, {delay:300, fireImmediately: true})

	}

  @observable
  referenceImageList = []
	
  @action
  init(storage) {
    this.referenceImageList = storage.referenceImageList
  }

  createSvgElement() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", (store.cellWidth * store.canvasWidth))
    svg.setAttribute("height", (store.cellHeight * store.canvasHeight))
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    )
    render(createElement(cellsAsTransparentSvg), svg)
    return svg
  }

  @action
  addReferenceImageFromCanvas = () => {
    svgAsPngUri(this.createSvgElement()).then(uri => {
      this.referenceImageList.push({
        img: uri,
        data: JSON.stringify(store.getCurrentState),
        opacity: 1,
        position: {x:0, y:0},
      })
    }).then(() => {
      store.emptyCanvas();
    })
  }
  
  @action
  removeReferenceImage = (index) => {
    this.referenceImageList.splice(index, 1);
  }
  
  @action
  changeReferenceImageOpacity = (index, value) => {
    this.referenceImageList[index].opacity = value
  }

  @action
  changeReferenceImagePosition = (index, axis, value) => {
    if(axis === "x") {
      this.referenceImageList[index].position.x = Number(value)
    }
    if(axis === "y") {
      this.referenceImageList[index].position.y = Number(value)
    }
  }

  @action
  editReferenceImage = (index) => {
    store.setCurrentState(JSON.parse(this.referenceImageList[index].data))
  }

  @action
  swapReferenceImageList = event => {
    [this.referenceImageList[+event.target.value], this.referenceImageList[+event.target.value + 1]] 
    = 
    [this.referenceImageList[+event.target.value + 1], this.referenceImageList[+event.target.value]];
  }

}
export default new ReferenceStore()
