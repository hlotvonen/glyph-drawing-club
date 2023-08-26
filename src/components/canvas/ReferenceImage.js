import { observer } from "mobx-react";
import { nanoid } from "nanoid";
import ReferenceStore from "../../models/ReferenceStore";

export const ReferenceImage = observer(() => {

  const referenceImageList = ReferenceStore.referenceImageList.map(referenceImage =>  
    <img 
      className="referenceImage"
      key={nanoid()}
      style={{
        opacity: referenceImage.opacity,
        width: JSON.parse(referenceImage.data).canvasWidth * JSON.parse(referenceImage.data).cellWidth,
        height: JSON.parse(referenceImage.data).canvasHeight * JSON.parse(referenceImage.data).cellHeight,
        transform: `translate(${referenceImage.position.x}px, ${referenceImage.position.y}px)`
      }}
      src={referenceImage.img} 
    />
  );

  return (
    <>
     {referenceImageList}
    </>
  )

})