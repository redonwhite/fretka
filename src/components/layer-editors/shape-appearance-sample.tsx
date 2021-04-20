import { observer } from "mobx-react-lite";
import { ShapeLayer } from "../../fretka/layers/shape-layer";
import { SvgPatternId, svgPatternsArray } from "../../fretka/shapes";
import { ContentFactory, PopSelector } from "./pop-selector";

export const ShapeAppearanceSample = observer((props: {
  layer: ShapeLayer;
}) => {

  const { layer } = props;
  const shape = layer.shape;

  const shapeAppearance = layer.appearance;
  const patternId = shape.appearance.patternId;

  const patternPickFactory: ContentFactory<SvgPatternId | undefined> = (pick) =>
    <>
      {svgPatternsArray.map(
        pat => <button key={pat.id} onClick={() => pick(pat.id)}>{pat.name}</button>
      )}
      <button key='undefined' onClick={() => pick(undefined)}>no pattern</button>
    </>

  return (
    <PopSelector selection={patternId}
      setSelection={patternId => shape.appearance.setPattern(patternId)}
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
});
