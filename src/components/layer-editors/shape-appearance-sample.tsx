import { useDispatch } from "react-redux";
import { ShapeLayerWithIndex } from "../../fretka/layers";
import { actions } from "../../fretka/layers-slice";
import { FretShapeSpec, getShapeAppearance, SvgPatternId, svgPatternsArray } from "../../fretka/shapes";
import { ContentFactory, PopSelector } from "./pop-selector";

export function ShapeAppearanceSample(props: {
  shape: FretShapeSpec;
  layer: ShapeLayerWithIndex;
}) {
  const { shape, layer } = props;
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
          actions.setLayerPattern({ layerIdx: layer.idx, pattern: selPattern })
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
