import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { pentatonicMinorPos1, pentatonicMinorPos2, pentatonicMinorPos3, pentatonicMinorPos4, pentatonicMinorPos5 } from "../../fretka/shape-library";
import { LayerStore } from "../../store/layer-store";
import { LayerEditor } from "./layer-editor";

import styles from "./layer-editor.module.scss";

/* prettier-ignore */
export const LayerStackEditor = observer((props: { layerStore: LayerStore }) => {
  const layerStore = props.layerStore;
  const layers = props.layerStore.layers;

  const layerEditors = layers.map((layer, index) => (
      <Draggable key={layer.id} draggableId={layer.id} index={index}>
        {/* prettier-ignore */}
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style, userSelect: 'none' }}
          >
            <LayerEditor layerStore={layerStore} layer={layer} key={layer.id} />
          </div>
        )}
      </Draggable>
    ));

  return (
    <Droppable droppableId="layerStore">
      {/* prettier-ignore */}
      {(provided, snapshot) => (
        <React.Fragment>
          <div
            ref={provided.innerRef}
            className={styles.layeredNoteSelectorWrapper}
          >
            {layerEditors}
            {provided.placeholder}
          </div>
          <div>
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
        </React.Fragment>
      )}
    </Droppable>
  );
});