import gridstore from "../../models/GridStore.js"

const GridControls = () => (
	<div className="pan-zoom-controls">
		<button onClick={gridstore.zoomIn} title="Zoom in [+]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M375,700h50l25-250l250-25v-50l-250-25l-25-250h-50l-25,250l-250,25v50l250,25Z"></path></svg>
		</button>
		<button onClick={gridstore.moveUp} title="Move up [k]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M200,550h400l-200-300Z"></path></svg>
		</button>
		<button onClick={gridstore.zoomOut} title="Zoom out [-]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M150,425l250,25l250-25v-50l-250-25l-250,25Z"></path></svg>
		</button>
		<button onClick={gridstore.moveLeft} title="Move left [h]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M550,600v-400l-300,200Z"></path></svg>
		</button>
		<button onClick={gridstore.center} title="Center canvas" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400,750c200,0,350-150,350-350c0-200-150-350-350-350c-200,0-350,150-350,350c0,200,150,350,350,350ZM100,400c0-175,125-300,300-300c175,0,300,125,300,300c0,175-125,300-300,300c-175,0-300-125-300-300ZM225,400c0,100,75,175,175,175c100,0,175-75,175-175c0-100-75-175-175-175c-100,0-175,75-175,175Z"></path></svg>
		</button>
		<button onClick={gridstore.moveRight} title="Move right [l]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M250,200v400l300-200Z"></path></svg>
		</button>
		<button onClick={gridstore.moveDown} title="Move down[j]" className="icon-button">
			<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M200,250h400l-200,300Z"></path></svg>
		</button>
	</div>
)

export default GridControls
