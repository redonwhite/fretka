import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { ChordFinder } from "../../fretka/chord-finder";
import { Interval } from "../../fretka/intervals";
import { LayerColorId, layerColorsArray } from "../../fretka/layers/fretka-layer";
import { basicNotesArray, getPrettyNoteName, NoteClass } from "../../fretka/notes";
import { LayerStore, NoteSelectionProps } from "../../store/app-state";

import styles from './chord-finder.module.scss';

const getWrapClass = (color?: LayerColorId, isRoot?: boolean) => {
  return classNames({
    [styles.noteSelectionWrap]: true,
    [styles.unselected]: !color,
    layerColor: color,
    layerRoot: isRoot,
    [`layerColor-${color}`]: color,
  });
};

function ChordNote(
  props: {
    colors: LayerColorId[];
    note: NoteClass,
    interval: Interval
  }
) {

  const { colors, note, interval } = props;

  const renderNoteWrapContents = (index: number = 0) => {
    return index >= colors.length
      ? <span className={styles.noteInnerWrap}>
          {interval.dotAbbr ?? interval.abbr}
        </span>
      : <span className={getWrapClass(colors[index])}>
          {renderNoteWrapContents(index + 1)}
        </span>
  }

  return <span className={styles.noteOuterWrap}>{renderNoteWrapContents()}</span>
}

export const ChordFinderUi = observer(
  (props: { layerStore: LayerStore; chordFinder: ChordFinder }) => {
    const { layerStore, chordFinder } = props;

    return (
      <>
        {layerColorsArray.map(color => (
          <div>
            {color.id}: {chordFinder.suggestionOptionByColor[color.id]}
          </div>
        ))}
        {
          <div>
            unselected: {chordFinder.suggestionOptionByColor.unselected}
          </div>
        }
        <div className={styles.chordMatches}>
          {chordFinder.suggestions.map(match => {
            const chordNotes = match.intervals.map(interval => {
              const note = basicNotesArray[(match.root.idx + interval.span) % 12];
              const colors = layerStore.getSelectionsForNote(note.id).map(sel => sel.layer.color);
              return { interval, note, colors };
            });
            
            return ( 
              <div key={"match " + match.root.id + " " + match.name} className={styles.chordMatch}>
                <div className={styles.chordName}>
                  {getPrettyNoteName(match.root)} {match.name}
                </div>
                <div className={styles.chordNotes}>
                  {chordNotes.map(chordNote => (
                    <ChordNote {...chordNote} key={chordNote.note.id} />
                  ))}
                </div>
              </div>)
            
          })}
        </div>
      </>
    );
  }
);
