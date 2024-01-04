import { Formula, IVector } from "../types";

export function divPosition(
  num: number,
  divAngle: number,
  radius: number,
  angle: number
): IVector {
  const x = Math.cos(divAngle * num + angle) * radius * 2;
  const y = Math.sin(divAngle * num + angle) * radius * 2;
  return { x, y };
}

export function computeDot(x: number, k: number, formula: Formula) {
  let dot = 0;

  switch (formula) {
    case Formula.Add:
      dot = x + k;
      break;

    case Formula.Multiply:
      dot = x * k;
      break;

    case Formula.Reverse:
      dot = -x;
      break;
    case Formula.Try:
      //dot = x + (x % 3) * k + k;
      //dot = (x * k) / 100;
      //dot = x % k;
      //dot = Math.sin((x * k) / 100) * 100;
      //dot = Math.tan((x * k) / 100) - (k / 100) * Math.PI;
      dot = x * Math.tan(k) * 10;
      break;
    default:
      break;
  }

  return dot;
}
