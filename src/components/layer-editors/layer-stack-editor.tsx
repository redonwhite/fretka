import { observer } from "mobx-react-lite";
import { LayerStore } from "../../fretka/state/stores";
import { LayerEditor } from "./layer-editor";

import styles from "./layer-editor.module.scss";

export const LayerStackEditor = observer((props : { layerStore: LayerStore }) => {
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
          onClick={layerStore.addShapeLayer}
        >
          <span>✚</span>
          <span>add shape</span>
        </button>
      </div>
    </div>
  );
});
