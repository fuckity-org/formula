import { IRGB } from "../types";

export function gradientNextColor(color: IRGB): IRGB {
  const rgb = color;
  if (rgb.red === 255) {
    if (rgb.blue > 0) {
      rgb.blue--;
    } else if (rgb.green < 255) {
      rgb.green++;
    } else {
      rgb.red--;
    }
  } else if (rgb.green === 255) {
    if (rgb.red > 0) {
      rgb.red--;
    } else if (rgb.blue < 255) {
      rgb.blue++;
    } else {
      rgb.green--;
    }
  } else if (rgb.blue === 255) {
    if (rgb.green > 0) {
      rgb.green--;
    } else if (rgb.red < 255) {
      rgb.red++;
    } else {
      rgb.blue--;
    }
  }

  return rgb;
}

export function getColor(color: IRGB, transparency?: number) {
  if (!transparency || transparency < 0 || transparency > 1) {
    transparency = 1;
  }
  return (
    "rgb(" +
    color.red +
    "," +
    color.green +
    "," +
    color.blue +
    "," +
    transparency +
    ")"
  );
}
