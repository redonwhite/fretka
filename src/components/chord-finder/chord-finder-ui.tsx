import { observer } from "mobx-react-lite";
import React from "react";
import { ChordFinder } from "../../fretka/chord-finder";
import { layerColorsArray } from "../../fretka/layers/fretka-layer";
import { getPrettyNoteName } from "../../fretka/notes";
import { LayerStore } from "../../store/app-state";

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
          {chordFinder.suggestions.map(match => (
            <li key={"match " + match.root.id + " " + match.name}>
              {getPrettyNoteName(match.root)} {match.name}
            </li>
          ))}
        </ul>
      </>
    );
  }
);
