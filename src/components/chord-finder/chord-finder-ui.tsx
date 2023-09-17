import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { ChordFinder, NoteTypeForSuggestions } from "../../fretka/chord-finder";
import { Interval } from "../../fretka/intervals";
import {
  LayerColorId,
  layerColorsArray,
  permanentLayerColors,
  permanentLayerColorsArray,
} from "../../fretka/layers/fretka-layer";
import {
  basicNotesArray,
  getPrettyNoteName,
  NoteClass,
} from "../../fretka/notes";

import chordFinderStyles from "./chord-finder.module.scss";
import { PopSelector } from "../layer-editors/pop-selector";
import { runInAction } from "mobx";
import { noteSuggestionOptions } from "../layer-editors/pop-selector-options";
import { LayerStore } from "../../store/layer-store";

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
        <div className={chordFinderStyles.chordFinderMenu} key="chord finder menu">
          {permanentLayerColorsArray.map(color => (
            <div key={color.id} className={chordFinderStyles.menuItem}>
              {color.id}:{" "}
              <SuggOptionPopSelector
                chordFinder={chordFinder}
                noteType={color.id}
              />
            </div>
          ))}
          {
            <div className={chordFinderStyles.menuItem} key="unselected">
              unselected:{" "}
              <SuggOptionPopSelector
                chordFinder={chordFinder}
                noteType={"unselected"}
              />
            </div>
          }
        </div>
        <div className={chordFinderStyles.chordMatches} key="chord finder matches">
          {basicNotesArray.map(note => {
            const suggestionsForNote = chordFinder.suggestionsByRoot[note.id];
            const renderedSuggesitonsForNote = suggestionsForNote.map(match => {
              const chordNotes = match.intervals.map(interval => {
                const note =
                  basicNotesArray[(match.root.idx + interval.span) % 12];
                const colors = layerStore
                  .getSelectionsForNote(note.id)
                  .map(sel => sel.layer.color);
                return { interval, note, colors };
              });
              const noteName = getPrettyNoteName(match.root);
              const chordName = match.abbr ?? match.shortName ?? match.name;
              const spacer =
                match.abbr !== undefined || match.shortName !== undefined
                  ? ""
                  : " ";
              const fullChordName = (
                <>
                  {noteName}
                  {spacer}
                  {chordName}
                </>
              );

              return (
                <div
                  key={"match " + match.root.id + " " + match.name}
                  className={chordFinderStyles.chordMatch}
                  onMouseEnter={() => layerStore.addScalePreview(match)}
                  onMouseLeave={() => layerStore.clearTempLayers()}
                >
                  <div className={chordFinderStyles.chordName}>
                    {fullChordName}
                  </div>
                  <div className={chordFinderStyles.chordNotes}>
                    {chordNotes.map(chordNote => (
                      <ChordNote {...chordNote} key={chordNote.note.id} />
                    ))}
                  </div>
                  <button onClick={() => layerStore.addScalePermanently(match)} />
                </div>
              );
            });

            return (
              <div
                className={classNames({
                  [chordFinderStyles.rootedChordMatches]: true,
                  [chordFinderStyles.zeroMatches]:
                    renderedSuggesitonsForNote.length === 0,
                })}
              >
                <h2 className={chordFinderStyles.rootName}>
                  {getPrettyNoteName(note)}
                </h2>
                <div className={chordFinderStyles.matchesForRoot}>
                  {renderedSuggesitonsForNote}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
);
