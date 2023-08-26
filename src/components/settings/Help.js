export const Help = () => (
  <>
  <section>
    <h3>BASICS</h3>
    <ol className="instructions">
      <li>
        Move around the canvas with <kbd>arrow keys</kbd>
      </li>
      <li>
        Press <kbd>q</kbd> to draw
      </li>
      <li>
        Press <kbd>r</kbd> to rotate
      </li>      
      <li>
        Press <kbd>f</kbd> to flip
      </li>
      <li>
        Press <kbd>i</kbd> to invert
      </li>

    </ol>
  </section>
  <section>
    <h3>COMPLETE REFERENCE</h3>
    <p>
      You can find a complete tutorial & more at the <a
        href="https://blog.glyphdrawing.club/usage-tutorial-for-glyph-drawing-club"
        target="_blank"
      >
        Glyph Drawing Club Blog
      </a>
    </p>
  </section>
  <section>
    <h3>KEYBOARD SHORTCUTS</h3>
    <h4>Move</h4>
    <table>
      <tbody>
        <tr>
          <td><kbd>Arrow keys or WASD</kbd></td>
          <td>Move</td>
        </tr>
        <tr>
          <td><kbd>Alt+Arrow keys</kbd></td>
          <td>Quickly move around the canvas</td>
        </tr>
      </tbody>
    </table>

    <h4>Draw</h4>
    <em>Hold down <kbd>CTRL</kbd> if you want to affect all layers</em>
    <table>
      <tbody>
        <tr>
          <td><kbd>q</kbd></td>
          <td>Draw (Place selected glyph)</td>
        </tr>
        <tr>
          <td><kbd>e</kbd> or <kbd>space</kbd></td>
          <td>Delete</td>
        </tr>
        <tr>
          <td><kbd>r</kbd></td>
          <td>Rotate</td>
        </tr>
        <tr>
          <td><kbd>f</kbd></td>
          <td>Flip</td>
        </tr>
        <tr>
          <td><kbd>i</kbd></td>
          <td>Invert</td>
        </tr>
      </tbody>
    </table>

    <h4>Extra</h4>
    <table>
      <tbody>
        <tr>
          <td><kbd>Cmd/Ctrl+z</kbd></td>
          <td>Undo</td>
        </tr>
        <tr>
          <td><kbd>Cmd/Ctrl+Shift+z</kbd></td>
          <td>Redo</td>
        </tr>
        <tr>
          <td><kbd>h</kbd></td>
          <td>Hide Grid</td>
        </tr>
        <tr>
          <td>(hold) <kbd>p</kbd></td>
          <td>Preview</td>
        </tr>
        <tr>
          <td><kbd>c</kbd></td>
          <td>Copy current glyph</td>
        </tr>
      </tbody>
    </table>

    <h4>Area selection</h4>
    <em>Hold down <kbd>CTRL</kbd> if you want to affect all layers</em>
    <table>
      <tbody>
        <tr>
          <td><kbd>Shift + s</kbd></td>
          <td>
            Start selection area. Use <kbd>arrows keys</kbd> to change the
            selection area. Press <kbd>Shift + s</kbd> again to lock selection area
          </td>
        </tr>
        <tr>
          <td><kbd>Shift + d</kbd></td>
          <td>Deselect area</td>
        </tr>
        <tr>
          <td><kbd>Shift + a</kbd></td>
          <td>Select all</td>
        </tr>
        <tr>
          <td><kbd>Shift + c</kbd></td>
          <td>Paste selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + m</kbd></td>
          <td>Mirror selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + f</kbd></td>
          <td>Flip selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + q</kbd></td>
          <td>Fill selected area with selected glyph</td>
        </tr>
        <tr>
          <td><kbd>Shift + e</kbd></td>
          <td>Empty selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + i</kbd></td>
          <td>Invert the colors of selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + y</kbd></td>
          <td>Rotate glyphs individually in selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + u</kbd></td>
          <td>Flip glyphs individually in selected area</td>
        </tr>
        <tr>
          <td><kbd>Shift + r</kbd></td>
          <td>
            Rotate selected area. Selection area has to be square
          </td>
        </tr>
        <tr>
          <td><kbd>Shift + t</kbd></td>
          <td>
            Transpose selected area. Selection area has to be square
          </td>
        </tr>
        <tr>
          <td><kbd>Shift + h</kbd></td>
          <td>Move selected area left</td>
        </tr>
        <tr>
          <td><kbd>Shift + j</kbd></td>
          <td>Move selected area down</td>
        </tr>
        <tr>
          <td><kbd>Shift + k</kbd></td>
          <td>Move selected area up</td>
        </tr>
        <tr>
          <td><kbd>Shift + l</kbd></td>
          <td>Move selected area right</td>
        </tr>
      </tbody>
    </table>

    <h4>Coloring tools</h4>
    <table>
      <tbody>
        <tr>
          <td><kbd>x</kbd></td>
          <td>Color palette quick access</td>
        </tr>
        <tr>
          <td><kbd>v</kbd></td>
          <td>Color foreground</td>
        </tr>
        <tr>
          <td><kbd>b</kbd></td>
          <td>Color background</td>
        </tr>
        <tr>
          <td><kbd>Shift + v</kbd></td>
          <td>Color selected area foreground</td>
        </tr>
        <tr>
          <td><kbd>Shift + b</kbd></td>
          <td>Color selected area background</td>
        </tr>
      </tbody>
    </table>
  </section>
  </>
)