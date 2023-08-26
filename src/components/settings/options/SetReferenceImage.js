import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import store from "../../../models/CanvasStore";
import ReferenceStore from "../../../models/ReferenceStore";

const ReferenceImageListItem = observer(({referenceImage, index}) => (
  <li className="ReferenceImageListItem">
    <div className="ReferenceImageListItem__thumbnailContainer">
      <img src={referenceImage.img} /> 
    </div>
    <div className="ReferenceImageListItem__buttons">
      <label>
        <input
          value={referenceImage.opacity}
          onChange={e => ReferenceStore.changeReferenceImageOpacity(index, e.target.value)}
          type="range"
          step=".01"
          min="0"
          max="1"
        />
        {(referenceImage.opacity * 100).toFixed(0)}% opacity
      </label>
      <label>
        X
        <input
          value={referenceImage.position.x}
          onChange={e => ReferenceStore.changeReferenceImagePosition(index, "x", e.target.value)}
          onFocus={() => store.toggleWriting(true)}
          onBlur={() => store.toggleWriting(false)}
          type="number"
        />
        px
      </label>
      <label>
        Y
        <input
          value={referenceImage.position.y}
          onChange={e => ReferenceStore.changeReferenceImagePosition(index, "y", e.target.value)}
          onFocus={() => store.toggleWriting(true)}
          onBlur={() => store.toggleWriting(false)}
          type="number"
        />
        px
      </label>

      <button onClick={() => ReferenceStore.editReferenceImage(index)}>Make current</button>
      <button onClick={() => ReferenceStore.removeReferenceImage(index)}>Remove</button>

      {ReferenceStore.referenceImageList.length - 1 === index
        ? "" 
        : <button className="swapReferenceImage" onClick={event => ReferenceStore.swapReferenceImageList(event)} value={index}>⇅</button>
      }
    </div>
  </li>
))

const ReferenceImageList = observer(() => {

  const list = ReferenceStore.referenceImageList.map((referenceImage, index) => (
    <ReferenceImageListItem 
      key={nanoid()} 
      referenceImage={referenceImage} 
      index={index} 
    />
  ));

  return (
    <ul className="ReferenceImageList">
      {list}
    </ul>
  )
})

export const SetReferenceImage = observer(() => {
  return (
    <section>
      <h3>Reference image</h3>
      <button onClick={() => ReferenceStore.addReferenceImageFromCanvas()}>Create from current canvas</button>
      <ReferenceImageList />
    </section>
  )
})
