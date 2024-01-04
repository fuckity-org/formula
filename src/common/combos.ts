import { Formula, LineType } from "./types";

export interface IComboParams {
  interval: number;
  divisions: number;
  kstep: number;
  anglespeed: number;
  lineType: LineType;
  formula: Formula;
}

export const Combos: IComboParams[] = [
  {
    interval: 10,
    divisions: 100,
    kstep: 0.01,
    anglespeed: 0,
    lineType: LineType.Line,
    formula: Formula.Multiply,
  },
  {
    interval: 10,
    divisions: 200,
    kstep: 0.01,
    anglespeed: 0,
    lineType: LineType.Curve,
    formula: Formula.Multiply,
  },
];
