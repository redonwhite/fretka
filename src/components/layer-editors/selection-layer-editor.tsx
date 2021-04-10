import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  isNoteRootInLayerByIdx,
  isNoteSelectedInLayerByIdx,
} from '../../fretka/note-selection';

import * as fretka from '../../fretka/notes';
import styles from './layer-editor.module.scss';
import { noteStateSelector } from '../../fretka/store';
import { actions } from '../../fretka/layers-slice';

export function SelectionLayerEditor(props: { layerIdx: any }) {
  const { layerIdx } = props;

  const noteSelection = useSelector(noteStateSelector);
  const notes = fretka.notes.basicNotesArray;
  const dispatch = useDispatch();

  const getButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.shy]: true,
      [styles.noteButton]: true,
      [styles.selected]: isNoteSelectedInLayerByIdx(
        noteSelection,
        note,
        layerIdx
      ),
    });
  };

  const getRootButtonClass = (note: fretka.NoteClass) => {
    return classNames({
      [styles.rootButton]: true,
      [styles.noteButton]: true,
      [styles.selected]: isNoteRootInLayerByIdx(noteSelection, note, layerIdx),
    });
  };

  return (
    <div className={styles.selectionLayerEditor}>
      {/* prettier-ignore */ }
      {notes.map((note, idx) => (
        <div className={styles.noteButtonSet} key={idx}>
          <button
            onClick={() =>
              dispatch(
                actions.toggleNoteSelection({
                  layerIdx: layerIdx,
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
                  layerIdx: layerIdx,
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
