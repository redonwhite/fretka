import { useDispatch } from "react-redux";
import { FretkaLayerWithIndex, LayerColorId, layerColors, layerColorsArray } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";

import { PickFunction, PopSelector } from "./pop-selector";
import styles from './layer-editor.module.scss';

export function LayerBullet(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;
  return <LayerColorPicker layer={layer} />;
}


export function ColorPicker(props: {color: LayerColorId, setColor: PickFunction<LayerColorId>}) {
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
      {''}
    </PopSelector>
  );
}

export function LayerColorPicker(props: { layer: FretkaLayerWithIndex }) {
  const { layer } = props;
  const { color } = layer;
  const dispatch = useDispatch();

  return (
    <ColorPicker
      color={color}
      setColor={newColor =>
        dispatch(
          actions.setLayerColor({ layerIdx: layer.idx, color: newColor })
        )
      }
    />
  );
}