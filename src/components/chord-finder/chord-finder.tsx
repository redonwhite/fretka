import { observer } from "mobx-react-lite";
import React from "react";
import { LayerStore } from "../../store/app-state";

export const ChordFinder = observer((props: { layerStore: LayerStore }) => {
  const { layerStore } = props;

  return (
    <>
      <ul>
        {suggestions.matches.map(match => (
          <li key={"match " + match.root.id + " " + match.name}>
            {getPrettyNoteName(match.root)} {match.name}
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {suggestions.subsets.map(subset => (
          <li key={"sub " + subset.root.id + " " + subset.name}>
            {getPrettyNoteName(subset.root)} {subset.name}
          </li>
        ))}
      </ul>
    </>
  );
});
