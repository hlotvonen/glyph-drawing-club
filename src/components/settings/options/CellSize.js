import { observer } from "mobx-react"
import store from "../../../models/CanvasStore"

export const CellSize = observer(() => (
  <>
    <div>
      Cell width:
      <button onClick={store.decreaseCellWidth}>-1</button>
      <button onClick={store.increaseCellWidth}>+1</button>
      <span>{store.cellWidth} px</span>
    </div>
      <div>
      Cell height: 
      <button onClick={store.decreaseCellHeight}> -1 </button>
      <button onClick={store.increaseCellHeight}> +1 </button>
      <span>{store.cellHeight} px</span>
    </div>
  </>
))
