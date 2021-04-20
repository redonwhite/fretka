import classNames from 'classnames';
import * as fretka from '../../fretka/notes';

import styles from './layer-editor.module.scss';
import { observer } from 'mobx-react-lite';
import { NoteSelectionLayer } from '../../fretka/layers/note-selection-layer';

export const SelectionLayerEditor = observer((props: { layer: NoteSelectionLayer }) => {

  const { layer } = props;
  const notes = fretka.notes.basicNotesArray;

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.shy]: true,
      [styles.noteButton]: true,
      [styles.selected]: layer.selection.has(note.id),
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: layer.root === note.id,
    });
  };

  return (
    <div
      className={styles.selectionLayerEditor + " " + styles.layerContentEditor}
    >
      {/* prettier-ignore */}
      {notes.map((note, idx) => (
        <div className={styles.noteButtonSet} key={idx}>
          <button
            onClick={() => layer.toggleNote(note.id)}
            className={getButtonClass(note)}
            key={idx}
          >
            {fretka.getPrettyNoteName(note)}
          </button>
          <button
            onClick={() => layer.toggleRoot(note.id)}
            className={getRootButtonClass(note)}
            key={"root" + idx}
          >
            root
          </button>
        </div>
      ))}
    </div>
  );
});