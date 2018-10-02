import React from "react";
import { observer } from "mobx-react";
import CanvasHeight from "./CanvasHeight";
import CanvasWidth from "./CanvasWidth";
import CellWidth from "./CellWidth";
import CellHeight from "./CellHeight";
import FontSize from "./FontSize";
import GlyphSelect from "./GlyphSelect";
import HideGrid from "./HideGrid";
import DarkTheme from "./DarkTheme";
import GlyphTuning from "./GlyphTuning";
import KeyMappings from "./KeyMappings";
import SelectedGlyph from "./SelectedGlyph";
import store from "../models/CanvasStore";
import KeymappingsBar from "./KeymappingsBar";
import DeleteRowOrCol from "./DeleteRowOrCol";
import AddRowOrCol from "./AddRowOrCol";
import ExportButtons from "./ExportButtons";
import SaveAsButton from "./SaveAsButton";
import LoadButton from "./LoadButton";
import EmptyCanvas from "./EmptyCanvas";
import SaveToDropboxButton from "./SaveToDropboxButton";
import GlyphRotate from "./GlyphRotate";
import GlyphFlip from "./GlyphFlip";
import GlyphInvertColor from "./GlyphInvertColor";
import ClipCells from "./ClipCells";
import TypingMode from "./TypingMode";
import PixelRendering from "./PixelRendering";

@observer
class Settings extends React.Component {
  render() {
    return (
      <div
        className={"controls_container" + (store.darkTheme ? " darkTheme" : "")}
      >
        <div className="canvas_preferences">
          <h3>Get started!</h3>
          <ol className="instructions">
            <li>
              <span className="hotkey">Click</span> on any glyph under Glyph
              selection.
            </li>
            <li>
              Press <span className="hotkey">q</span> to insert the glyph.
            </li>
            <li>
              Move around the canvas by pressing{" "}
              <span className="hotkey">arrow keys</span>.
            </li>
            <li>
              Press <span className="hotkey">f</span> to flip or{" "}
              <span className="hotkey">r</span> to rotate a glyph.
            </li>
            <li>
              <a
                href="https://github.com/hlotvonen/glyph-drawing-club"
                target="_blank"
              >
                See more tips & all the hotkeys here!
              </a>
            </li>
          </ol>
          <hr />

          <h3>Save / Load</h3>
          <SaveAsButton
            fileName={store.fileName}
            updateFileName={store.updateFileName}
          />
          <LoadButton />
          <ExportButtons
            exportSizeMultiplier={store.exportSizeMultiplier}
            updateExportSizeMultiplier={store.updateExportSizeMultiplier}
          />

          <h3>Options</h3>
          <HideGrid
            hideGrid={store.hideGrid}
            handleChangeHideGrid={store.handleChangeHideGrid}
          />
          <ClipCells
            clipCells={store.clipCells}
            handleChangeClipCells={store.handleChangeClipCells}
          />
          <TypingMode
            typingMode={store.typingMode}
            handleChangeTypingMode={store.handleChangeTypingMode}
          />
          <DarkTheme handleChangeTheme={store.handleChangeTheme} />
          <PixelRendering
            pixelRendering={store.pixelRendering}
            handleChangePixelRendering={store.handleChangePixelRendering}
          />

          <GlyphSelect />

          <h3>Canvas Settings</h3>
          <CanvasWidth
            addCol={store.addCol}
            deleteCol={store.deleteCol}
            canvasWidth={store.canvasWidth}
          />
          <CanvasHeight
            addRow={store.addRow}
            deleteRow={store.deleteRow}
            canvasHeight={store.canvasHeight}
          />
          <DeleteRowOrCol
            deleteRowAtSelection={store.deleteRowAtSelection}
            deleteColAtSelection={store.deleteColAtSelection}
          />
          <AddRowOrCol
            addRowAtSelection={store.addRowAtSelection}
            addColAtSelection={store.addColAtSelection}
          />
          <EmptyCanvas emptyCanvas={store.emptyCanvas} />

          <br />

          <CellWidth
            increaseCellWidth={store.increaseCellWidth}
            decreaseCellWidth={store.decreaseCellWidth}
            cellWidth={store.cellWidth}
          />
          <CellHeight
            increaseCellHeight={store.increaseCellHeight}
            decreaseCellHeight={store.decreaseCellHeight}
            cellHeight={store.cellHeight}
          />
          <FontSize
            increaseFontSize={store.increaseFontSize}
            decreaseFontSize={store.decreaseFontSize}
            defaultFontSize={store.defaultFontSize}
          />

          <GlyphTuning />

          <hr />

          <h3>Contribute to future publications!</h3>
          <p>
            If you would like to contribute your artwork to possible upcoming
            GD.C zines, use the form below to submit your work. By clicking the
            button below you give persmission to use your artwork. Only your
            name and country will be pusblished. The contributors will receive a
            pdf of the zines sent to email. The zines will be sold but only to
            cover printing costs.
          </p>
          <br />
          <SaveToDropboxButton
            userFullName={store.userFullName}
            updateFullName={store.updateFullName}
            userEmail={store.userEmail}
            updateEmail={store.updateEmail}
            userCountry={store.userCountry}
            updateCountry={store.updateCountry}
          />

          <hr />
          <br />
          <p>
            Follow development at{" "}
            <a
              href="https://github.com/hlotvonen/unicode-art-editor"
              target="_blank"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Settings;
