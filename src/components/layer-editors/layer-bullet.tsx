import {
  FretkaLayer,
  LayerColorId,
  layerColorsArray,
} from "../../fretka/layers/fretka-layer";
import { observer } from "mobx-react-lite";
import { PickFunction, PopSelector } from "./pop-selector";

import styles from "./layer-editor.module.scss";
import ui from "../ui.module.scss";

export const LayerBullet = observer((props: { layer: FretkaLayer }) => <>
  <LayerColorPicker layer={props.layer} />
</>);

export const LayerColorPicker = observer((props: { layer: FretkaLayer }) => (
  <ColorPicker
    showLabel={true}
    color={props.layer.color}
    setColor={props.layer.setColor.bind(props.layer)}
  />
));

export const ColorPicker = observer(
  (props: {
    color: LayerColorId;
    setColor: PickFunction<LayerColorId>;
    showLabel?: boolean;
  }) => {
    const { color, setColor, showLabel } = props;

    const popupContentFactory = (pick: PickFunction<LayerColorId>) => {
      return (
        <>
          {layerColorsArray.map((layerColor, idx) => (
            <button
              className={`layerColor layerColor-${layerColor.id} layerColorButton ${styles.layerColorSelectorButton}`}
              key={idx}
              onClick={() => pick(layerColor.id)}
            >
              {layerColor.id}
            </button>
          ))}
        </>
      );
    };

    return (
      <PopSelector
        buttonClassName={`${ui.noMinHeight} layerColor layerColor-${color} layerColorButton`}
        contentFactory={popupContentFactory}
        selection={color}
        setSelection={setColor}
      >
        {showLabel ? color : ""}
      </PopSelector>
    );
  }
);

