import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { ChordFinder } from "../../fretka/chord-finder";
import { Interval } from "../../fretka/intervals";
import { LayerColorId, layerColorsArray } from "../../fretka/layers/fretka-layer";
import { basicNotesArray, getPrettyNoteName, NoteClass } from "../../fretka/notes";
import { LayerStore, NoteSelectionProps } from "../../store/app-state";

import styles from './chord-finder.module.scss';

const getNoteClass = (color?: LayerColorId, final?: boolean, isRoot?: boolean) => {
  return classNames({
    [styles.chordNote]: true,
    [styles.unselected]: !color,
    layerColor: color,
    [styles.final]: final,
    //layerRoot: isRoot,
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

  const wrap = (index: number = 0) => {
    return index >= colors.length - 1 ? (
      <span className={getNoteClass(colors[index], true)}>
        {interval.dotAbbr ?? interval.abbr}
      </span>
    ) : (
        <span className={getNoteClass(colors[index], false)}>
          {wrap(index + 1)}
        </span>
    );
  }

  return colors.length > 0 ? (
    <>{wrap()}</>
  ) : (
    <span className={getNoteClass(undefined, true)}>{wrap()}</span>
  );
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
        <ul>
          {chordFinder.suggestions.map(match => {
            const chordNotes = match.intervals.map(interval => {
              const note = basicNotesArray[(match.root.idx + interval.span) % 12];
              const colors = layerStore.getSelectionsForNote(note.id).map(sel => sel.layer.color);
              return { interval, note, colors };
            });
            
            return (
              <li key={"match " + match.root.id + " " + match.name}>
                {getPrettyNoteName(match.root)}
                {match.name}:
                <span className={styles.chordNotes}>
                  {chordNotes.map(chordNote => <ChordNote {...chordNote} key={chordNote.note.id} />)}
                </span>
              </li>
            )
          })}
        </ul>
      </>
    );
  }
);
