import classNames from "classnames";
import { observer } from "mobx-react-lite";
import {
  ChordFinder,
  noteSuggestionOptionsArray,
  NoteTypeForSuggestions,
} from "../../fretka/chord-finder";
import { Interval } from "../../fretka/intervals";
import { LayerColorId, layerColorsArray } from "../../fretka/layers/fretka-layer";
import { basicNotesArray, getPrettyNoteName, NoteClass } from "../../fretka/notes";
import { LayerStore, NoteSelectionProps } from "../../store/app-state";

import chordFinderStyles from './chord-finder.module.scss';
import ui from "../ui.module.scss";
import { PopSelector } from "../layer-editors/pop-selector";
import { action, runInAction } from "mobx";
import { noteSuggestionOptions } from "../layer-editors/pop-selector-options";

const getWrapClass = (color?: LayerColorId, isRoot?: boolean) => {
  return classNames({
    [chordFinderStyles.noteSelectionWrap]: true,
    [chordFinderStyles.unselected]: !color,
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
      ? <span className={chordFinderStyles.noteInnerWrap}>
          {interval.dotAbbr ?? interval.abbr}
        </span>
      : <span className={getWrapClass(colors[index])}>
          {renderNoteWrapContents(index + 1)}
        </span>
  }

  return <span className={chordFinderStyles.noteOuterWrap}>{renderNoteWrapContents()}</span>
}

export const SuggOptionPopSelector = observer(
  (props: { chordFinder: ChordFinder; noteType: NoteTypeForSuggestions }) => {
    const { chordFinder, noteType } = props;
    const colorClass =
      noteType === "unselected" ? "" : `layerColor layerColor-${noteType}`;

    return (
      <PopSelector
        selection={chordFinder.suggestionOptionByColor[noteType]}
        options={noteSuggestionOptions}
        setSelection={value =>
          runInAction(
            () => (
              console.log(value),
              (chordFinder.suggestionOptionByColor[noteType] = value)
            )
          )
        }
        popoverClassName={colorClass}
        buttonClassName={colorClass}
      >
        {chordFinder.suggestionOptionByColor[noteType]}
      </PopSelector>
    );
  }
);

export const ChordFinderUi = observer(
  (props: { layerStore: LayerStore; chordFinder: ChordFinder }) => {
    const { layerStore, chordFinder } = props;

    return (
      <>
        <div className={chordFinderStyles.chordFinderMenu}>
          {layerColorsArray.map(color => (
            <div key={color.id} className={chordFinderStyles.menuItem}>
              {color.id}:{" "}
              <SuggOptionPopSelector
                chordFinder={chordFinder}
                noteType={color.id}
              />
            </div>
          ))}
          {
            <div className={chordFinderStyles.menuItem}>
              unselected:{" "}
              <SuggOptionPopSelector
                chordFinder={chordFinder}
                noteType={"unselected"}
              />
            </div>
          }
        </div>
        <div className={chordFinderStyles.chordMatches}>
          {chordFinder.suggestions.map(match => {
            const chordNotes = match.intervals.map(interval => {
              const note =
                basicNotesArray[(match.root.idx + interval.span) % 12];
              const colors = layerStore
                .getSelectionsForNote(note.id)
                .map(sel => sel.layer.color);
              return { interval, note, colors };
            });

            return (
              <div
                key={"match " + match.root.id + " " + match.name}
                className={chordFinderStyles.chordMatch}
              >
                <div className={chordFinderStyles.chordName}>
                  {getPrettyNoteName(match.root)} {match.name}
                </div>
                <div className={chordFinderStyles.chordNotes}>
                  {chordNotes.map(chordNote => (
                    <ChordNote {...chordNote} key={chordNote.note.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
);
