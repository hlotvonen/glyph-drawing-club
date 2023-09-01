import { observer } from "mobx-react";
import FontStore from "../../../models/FontStore";

export const LoadDefaultFont = observer(() => {

  function handleSubmit(e) {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    FontStore.loadFontFromUrl(formJson.selectedFont);
  }

  return (
    <section data-tooltip="Choose a Preset Font: Pick from a selection of pre-defined fonts">
      <h3>Add more shapes</h3>
      <form method="post" onSubmit={handleSubmit}>
        <select name="selectedFont" defaultValue="Tesserae Extended">
          <option value="fonts/Tesserae-TypeDesign.otf">Tesserae Core</option>
          <option value="fonts/Tesserae-4x4Extended.otf">Tesserae Extended</option>
          <option value="fonts/RayMantaC64-Regular.otf">RayMantaC64</option>
          <option value="fonts/ImagoMundiMei-Regular.otf">ImagoMundiMei</option>
          <option value="fonts/ScrollBorder2-Regular.otf">ScrollBorder</option>
          <option value="fonts/BruceRogersOrnaments-Regular.otf">Bruce Rogers Ornaments</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </section>
  );
})