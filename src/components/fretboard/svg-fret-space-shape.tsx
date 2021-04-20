export {};
// import { useContext } from 'react';
// import { FretboardContext } from '../../fretka/fretboard';
// import { layerColorsArray, ShapeLayerWithIndex } from '../../fretka/layers';
// import { fretSpaceShapeToGridSpace, FretShapeSpec, getShapeAppearance } from '../../fretka/shapes';
// import { xyCoordSetToPathD } from '../../fretka/svg';

// export function SvgFretSpaceShape(props: { shape: FretShapeSpec, layer: ShapeLayerWithIndex }) {

//   const { shape, layer } = props;
//   const shapeAppearance = getShapeAppearance(shape, layer);
//   const f = useContext(FretboardContext);
//   if (!f) return null;

//   const gridSpaceCoordSets = fretSpaceShapeToGridSpace(
//     shape.segments,
//     f.tuning,
//     f.fretCount,
//   );

//   const xyCoordSets = gridSpaceCoordSets.map(f.gridSpaceToXySpace);
//   const pathDs = xyCoordSets.map(xyCoordSetToPathD);

//   return (
//     <>
//       {pathDs.map((d, idx) => (
//         <path className="fretkaShape" d={d} key={idx} {...shapeAppearance} />
//       ))}
//     </>
//   );
// }
