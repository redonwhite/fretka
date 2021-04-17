import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { isNoteRootInLayerByIdx } from "../../fretka/note-selection";

import * as fretka from '../../fretka/notes';
import styles from './layer-editor.module.scss';
import { noteStateSelector } from '../../fretka/store';
import { actions } from '../../fretka/layers-slice';
import { NoteSelectionLayer } from "../../fretka/layers";

export function SelectionLayerEditor(props: { layerId: string }) {
  const { layerId } = props;

  const noteSelection = useSelector(noteStateSelector);
  const notes = fretka.notes.basicNotesArray;
  const layer = noteSelection.layers.find(
    
    l => l.id === layerId
  
  ) as NoteSelectionLayer;
  const dispatch = useDispatch();

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.shy]: true,
      [styles.noteButton]: true,
      [styles.selected]: layer.selection.selected[note.id],
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: layer.selection.root === note.id,
    });
  };

  return (
    <div
      className={styles.selectionLayerEditor + " " + styles.layerContentEditor}
    >
      {/* prettier-ignore */ }
      {notes.map((note, idx) => (
        <div className={styles.noteButtonSet} key={idx}>
          <button
            onClick={() =>
              dispatch(
                actions.toggleNoteSelection({
                  layerId: layerId,
                  noteId: note.id,
                })
              )
            }
            className={getButtonClass(note)}
            key={idx}
          >
            {fretka.getPrettyNoteName(note)}
          </button>
          <button
            onClick={() =>
              dispatch(
                actions.toggleRootSelection({
                  layerId: layerId,
                  noteId: note.id,
                })
              )
            }
            className={getRootButtonClass(note)}
            key={"root" + idx}
          >
            root
          </button>
        </div>
      ))}
    </div>
  );
}
