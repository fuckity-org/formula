import { useEffect, useRef, useState } from "react";
import css from "./Circle.module.scss";
import { getColor, gradientNextColor } from "../../common/utils/color-utils";
import { Formula, IRGB, LineType } from "../../common/types";
import { DEFAULT_RADIUS, DEFAULT_SIZE } from "../../common/constants";
import { computeDot, divPosition } from "../../common/utils/formula-utils";

interface ICircleProps {
  formula: Formula;
  interval: number;
  lineType: LineType;
  divisions: number;
  angleSpeed: number;
  coefficientStep: number;
}

export function Circle({
  formula,
  divisions,
  interval,
  lineType,
  coefficientStep,
  angleSpeed,
}: ICircleProps) {
  const [coefficient, setCoefficient] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divAngle = (Math.PI * 2) / divisions;
  const [color, setColor] = useState<IRGB>({ red: 255, green: 0, blue: 0 });
  const [angle, setAngle] = useState(0);

  function drawBorder(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.ellipse(
      DEFAULT_SIZE / 2,
      DEFAULT_SIZE / 2,
      DEFAULT_RADIUS * 2,
      DEFAULT_RADIUS * 2,
      0,
      0,
      1000
    );
    ctx.stroke();
  }

  function draw(ctx: CanvasRenderingContext2D, coefficient: number) {
    // draw simple circle
    ctx.clearRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
    ctx.strokeStyle = "white";
    drawBorder(ctx);

    const newColor = gradientNextColor(color);

    for (let index = 0; index < divisions; index++) {
      const dotStart = index;

      const dotEnd = computeDot(dotStart, coefficient, formula);

      const startPosition = divPosition(
        dotStart,
        divAngle,
        DEFAULT_RADIUS,
        angle
      );
      const middlePosition = divPosition(
        (dotStart + dotEnd) / 2,
        divAngle,
        DEFAULT_RADIUS,
        angle
      );
      const endPosition = divPosition(dotEnd, divAngle, DEFAULT_RADIUS, angle);

      ctx.strokeStyle = getColor(newColor);

      ctx.beginPath();
      ctx.moveTo(
        DEFAULT_SIZE / 2 + startPosition.x,
        DEFAULT_SIZE / 2 + startPosition.y
      );

      if (lineType === LineType.Line) {
        //Линии
        ctx.lineTo(
          DEFAULT_SIZE / 2 + endPosition.x,
          DEFAULT_SIZE / 2 + endPosition.y
        );
      } else if (lineType === LineType.Curve) {
        //Кривые
        ctx.bezierCurveTo(
          DEFAULT_SIZE / 2 + startPosition.x,
          DEFAULT_SIZE / 2 + startPosition.y,
          DEFAULT_SIZE / 2 + endPosition.x,
          DEFAULT_SIZE / 2 + endPosition.y,
          DEFAULT_SIZE / 2 + middlePosition.x,
          DEFAULT_SIZE / 2 + middlePosition.y
        );
      } else if (lineType === LineType.Circle) {
        //Круги
        ctx.ellipse(
          DEFAULT_SIZE / 2,
          DEFAULT_SIZE / 2,
          Math.abs(middlePosition.x),
          Math.abs(middlePosition.y),
          startPosition.x,
          endPosition.y,
          1000
        );
      }

      ctx.stroke();
      ctx.closePath();
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        draw(ctx, coefficient);
      }
    }

    return () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // ctx.reset();
        }
      }
    };
  }, [coefficient]);

  //TODO: timeline useEffect

  useEffect(() => {
    const newInterval = setInterval(onChange, interval);
    return () => {
      clearInterval(newInterval);
    };
  });

  const onChange = () => {
    let newCoefficient = 0;
    if (coefficient < 100) {
      newCoefficient = coefficient + coefficientStep;
    }

    let newAngle = 0;
    if (angle + angleSpeed <= 360) {
      newAngle = angle + angleSpeed;
    }

    setAngle(newAngle);
    setCoefficient(newCoefficient);
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // const newCoefficient = e.nativeEvent.offsetX / 1000;
    // setCoefficient(newCoefficient);
  };

  return (
    <div className={css.circle} onMouseMove={(e) => onMove(e)}>
      <canvas
        ref={canvasRef}
        width={DEFAULT_SIZE}
        height={DEFAULT_SIZE}
      ></canvas>
    </div>
  );
}
