import type { XyCoordSet } from './shapes';

export type Point = {
  x: number;
  y: number;
};

export function xyCoordSetToPathD(xyCoordSet: XyCoordSet): string {
  return 'M ' + xyCoordSet.map((coord) => coord[0] + '  ' + coord[1] + ' ');
}
