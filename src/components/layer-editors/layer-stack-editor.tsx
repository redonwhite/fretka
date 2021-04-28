import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { pentatonicMinorPos1, pentatonicMinorPos2, pentatonicMinorPos3, pentatonicMinorPos4, pentatonicMinorPos5 } from "../../fretka/shape-library";
import { LayerStore } from "../../store/app-state";
import { LayerEditor } from "./layer-editor";

import styles from "./layer-editor.module.scss";

export const LayerStackEditor = observer(
  (props: { layerStore: LayerStore }) => {
    const layerStore = props.layerStore;
    const layers = props.layerStore.layers;

    const layerEditors = layers.map(layer => (
      <LayerEditor layerStore={layerStore} layer={layer} key={layer.id} />
    ));

    return (
      <div className={styles.layeredNoteSelectorWrapper}>
        {layerEditors}
        <div className={styles.emptyLayerSlotActionWrapper}>
          <button
            className="addLayerButton secondaryButton"
            onClick={layerStore.addNoteSelectionLayer}
          >
            <span>✚</span>
            <span>add note selection</span>
          </button>
          <button
            className="addLayerButton secondaryButton"
            onClick={() =>
              runInAction(() => {
                layerStore.addShapeLayer(
                  "Pentatonic minor - position 1",
                  pentatonicMinorPos1
                );
                layerStore.addShapeLayer(
                  "Pentatonic minor - position 2",
                  pentatonicMinorPos2
                );
                layerStore.addShapeLayer(
                  "Pentatonic minor - position 3",
                  pentatonicMinorPos3
                );
                layerStore.addShapeLayer(
                  "Pentatonic minor - position 4",
                  pentatonicMinorPos4
                );
                layerStore.addShapeLayer(
                  "Pentatonic minor - position 5",
                  pentatonicMinorPos5
                );
              })
            }
          >
            <span>✚</span>
            <span>add shape</span>
          </button>
        </div>
      </div>
    );
  }
);
