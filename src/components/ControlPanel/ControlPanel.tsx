import css from "./ControlPanel.module.scss";
import { Formula, LineType } from "../../common/types";
import { ControlGroup } from "../ControlGroup/ControlGroup";
import { Control } from "../Control/Control";

interface ICircleProps {
  interval: number;
  lineType: LineType;
  divisions: number;
  formula: Formula;
  coefficientStep: number;
  angleSpeed: number;
  isOpenLineTypes: boolean;
  isOpenFormulas: boolean;
  onChangeInterval: (speed: number) => void;
  onChangeLineType: (lineType: LineType) => void;
  onOpenLineTypes: () => void;
  onOpenFormulas: () => void;
  onChangeDivisions: (divisions: number) => void;
  onChangeFormula: (formula: Formula) => void;
  onChangeCoefficientStep: (step: number) => void;
  onChangeAngleSpeed: (angleSpeed: number) => void;
}

export function ControlPanel({
  interval,
  lineType,
  divisions,
  formula,
  coefficientStep,
  angleSpeed,
  isOpenFormulas,
  isOpenLineTypes,
  onChangeInterval,
  onChangeLineType,
  onOpenFormulas,
  onOpenLineTypes,
  onChangeDivisions,
  onChangeFormula,
  onChangeCoefficientStep,
  onChangeAngleSpeed,
}: ICircleProps) {
  return (
    <div className={css.controlPanel}>
      <Control
        label="Interval"
        type="number"
        value={interval}
        step={0.01}
        onChange={(e) => onChangeInterval(Number(e.target.value))}
      />
      <Control
        label="Divisions"
        type="number"
        value={divisions}
        step={50}
        onChange={(e) => onChangeDivisions(Number(e.target.value))}
      />
      <Control
        label="K step"
        type="number"
        value={coefficientStep}
        step={0.01}
        onChange={(e) => onChangeCoefficientStep(Number(e.target.value))}
      />
      <Control
        label="Angle Speed"
        type="number"
        value={angleSpeed}
        step={0.01}
        onChange={(e) => onChangeAngleSpeed(Number(e.target.value))}
      />
      <ControlGroup name="Line Type" onClick={onOpenLineTypes}>
        {isOpenLineTypes &&
          [LineType.Line, LineType.Curve, LineType.Circle].map((option) => (
            <Control
              key={option}
              label={option}
              type="radio"
              value={option}
              checked={lineType === option}
              onChange={() => onChangeLineType(option)}
            />
          ))}
      </ControlGroup>
      <ControlGroup name="Formula" onClick={onOpenFormulas}>
        {isOpenFormulas &&
          [Formula.Add, Formula.Multiply, Formula.Reverse, Formula.Try].map(
            (option) => (
              <Control
                key={option}
                label={option}
                type="radio"
                value={option}
                checked={formula === option}
                onChange={() => onChangeFormula(option)}
              />
            )
          )}
      </ControlGroup>
    </div>
  );
}
