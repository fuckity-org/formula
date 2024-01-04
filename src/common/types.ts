export interface IRGB {
  red: number;
  green: number;
  blue: number;
}

export interface IVector {
  x: number;
  y: number;
}

export enum LineType {
  Line = "line",
  Curve = "curve",
  Circle = "circle",
}

export enum Formula {
  Add = "add",
  Multiply = "multiply",
  Reverse = "reverse",
  Try = "try",
}
