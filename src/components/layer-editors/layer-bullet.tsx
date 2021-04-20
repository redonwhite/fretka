import {
  FretkaLayer,
  LayerColorId,
  layerColorsArray,
} from "../../fretka/layers/fretka-layer";
import { observer } from "mobx-react-lite";
import { PickFunction, PopSelector } from "./pop-selector";

import styles from "./layer-editor.module.scss";

export const LayerBullet = observer((props: { layer: FretkaLayer }) => <>
  <LayerColorPicker layer={props.layer} />
</>);

export const LayerColorPicker = observer((props: { layer: FretkaLayer }) => (
  <ColorPicker color={props.layer.color} setColor={props.layer.setColor.bind(props.layer)} />
));

export const ColorPicker = observer((props: {
  color: LayerColorId;
  setColor: PickFunction<LayerColorId>;
}) => {
  const { color, setColor } = props;

  const popupContentFactory = (pick: PickFunction<LayerColorId>) => {
    return (
      <>
        {layerColorsArray.map((layerColor, idx) => (
          <button
            className={`layerColor layerColor-${layerColor.id} layerColorButton ${styles.layerColorSelectorButton}`}
            key={idx}
            onClick={() => pick(layerColor.id)}
          >
            {""}
          </button>
        ))}
      </>
    );
  };

  return (
    <PopSelector
      className={`layerColor layerColor-${color} layerColorButton ${styles.layerColorSelectorButton}`}
      contentFactory={popupContentFactory}
      selection={color}
      setSelection={setColor}
    >
      {""}
    </PopSelector>
  );
});

