import { useDispatch, useSelector } from "react-redux";
import { ShapeLayer } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";
import { getShapeAppearance, SvgPatternId, svgPatternsArray } from "../../fretka/shapes";
import { noteStateSelector } from "../../fretka/store";
import { ContentFactory, PopSelector } from "./pop-selector";

export function ShapeAppearanceSample(props: {
  layerId: string;
}) {
  const { layerId } = props;
  const noteSelection = useSelector(noteStateSelector);
  const layer = noteSelection.layers.find(l => l.id === layerId) as ShapeLayer;
  const shape = layer.shape;

  const shapeAppearance = getShapeAppearance(shape, layer);

  const pattern = shape.appearance.pattern;
  const patternPickFactory: ContentFactory<SvgPatternId> = (pick) =>
    <>
      {svgPatternsArray.map(
          pat => <button onClick={() => pick(pat.id)}>{ pat.name }</button>
      )}
    </>
  const dispatch = useDispatch();

  return (
    <PopSelector
      selection={pattern}
      setSelection={selPattern =>
        dispatch(
          actions.setLayerPattern({ layerId: layer.id, pattern: selPattern })
        )
      }
      contentFactory={patternPickFactory}
    >
      <svg width="100%">
        <rect
          x="0"
          y="0"
          rx="5"
          width="100%"
          height="100%"
          {...shapeAppearance}
        />
      </svg>
    </PopSelector>
  );
}
