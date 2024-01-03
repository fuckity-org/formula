import { useEffect, useRef, useState } from "react";
import css from "./Circle.module.scss";

const CIRCLE_RADIUS = 100;
const DEFAULT_SIZE = 500;
const DEFAULT_DIVISIONS = 100;
const DEFAULT_T = 0.5;

interface ICircleProps {
  canvasWidth?: number;
  canvasHeight?: number;
  divisions?: number;
  radius?: number;
}

interface IVector {
  x: number;
  y: number;
}

export function Circle({
  canvasHeight = DEFAULT_SIZE,
  canvasWidth = DEFAULT_SIZE,
  divisions = DEFAULT_DIVISIONS,
  radius = CIRCLE_RADIUS,
}: ICircleProps) {
  const [coefficient, setCoefficient] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divAngle = (Math.PI * 2) / divisions;
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [transperence, setTransperence] = useState(1);

  function drawBorder(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.ellipse(
      canvasHeight / 2,
      canvasWidth / 2,
      radius * 2,
      radius * 2,
      0,
      0,
      1000
    );
    ctx.stroke();
  }

  function divPosition(num: number): IVector {
    const x = Math.cos(divAngle * num) * radius * 2;
    const y = Math.sin(divAngle * num) * radius * 2;
    return { x, y };
  }

  function getNewColor(index?: number): string {
    if (red === 255) {
      if (blue > 0) {
        setBlue(blue - 1);
      } else if (green < 255) {
        setGreen(green + 1);
      } else {
        setRed(red - 1);
      }
    } else if (green === 255) {
      if (red > 0) {
        setRed(red - 1);
      } else if (blue < 255) {
        setBlue(blue + 1);
      } else {
        setGreen(green - 1);
      }
    } else if (blue === 255) {
      if (green > 0) {
        setGreen(green - 1);
      } else if (red < 255) {
        setRed(red + 1);
      } else {
        setBlue(blue - 1);
      }
    }

    if (index) {
      setTransperence((1 / index) * 100);
    } else {
      setTransperence(1);
    }

    return "rgb(" + red + "," + green + "," + blue + "," + transperence + ")";
  }

  function draw(ctx: CanvasRenderingContext2D, coefficient: number) {
    // draw simple circle
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = "white";
    drawBorder(ctx);

    for (let index = 0; index < divisions; index++) {
      const x = index;
      const y = x * Math.tan(coefficient) * 10;

      const startPosition = divPosition(x);
      const middlePosition = divPosition((x + y) / 2);
      const endPosition = divPosition(y);

      ctx.strokeStyle = getNewColor(index);

      ctx.beginPath();
      ctx.moveTo(
        canvasWidth / 2 + startPosition.x,
        canvasHeight / 2 + startPosition.y
      );

      //Линии
      // ctx.lineTo(
      //   canvasWidth / 2 + endPosition.x,
      //   canvasHeight / 2 + endPosition.y
      // );

      //Кривые
      ctx.bezierCurveTo(
        canvasWidth / 2 + startPosition.x,
        canvasHeight / 2 + startPosition.y,
        canvasWidth / 2 + endPosition.x,
        canvasHeight / 2 + endPosition.y,
        canvasWidth / 2 + middlePosition.x,
        canvasHeight / 2 + middlePosition.y
      );

      //Круги
      // ctx.ellipse(
      //   canvasHeight / 2,
      //   canvasWidth / 2,
      //   x,
      //   y,
      //   Math.abs(endPosition.x),
      //   Math.abs(endPosition.y),
      //   1000
      // );
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

  useEffect(() => {
    const interval = setInterval(onChange, 10);
    return () => {
      /* do cleanup or unmount */
      clearInterval(interval);
    };
  });

  const onChange = () => {
    let newCoefficient = 0;
    if (coefficient < 100) {
      newCoefficient = coefficient + 0.001;
    }
    setCoefficient(newCoefficient);
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newCoefficient = e.nativeEvent.offsetX / 1000;
    setCoefficient(newCoefficient);
    console.log(newCoefficient);
  };

  return (
    <div className={css.circle} onMouseMove={(e) => onMove(e)}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </div>
  );
}
