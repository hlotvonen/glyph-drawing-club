import { observer } from "mobx-react"
import store from "../../../models/CanvasStore"

export const CellSize = observer(() => {

  function increaseSize(){
    store.increaseCellWidth()
    store.increaseCellHeight()
    store.increaseFontSize()
  }
  function decreaseSize(){
    store.decreaseCellWidth()
    store.decreaseCellHeight()
    store.decreaseFontSize()
  }
  return(
    <section data-tooltip="Change Cell Size: Resize to adjust overall image dimensions">
      <h3>Cell size:</h3>
      <button onClick={decreaseSize}>-</button>
      <button onClick={increaseSize}>+</button>
      <span>{store.cellWidth} px</span>
    </section>
  )
})
