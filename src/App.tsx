import { useState } from "react";
import "./App.css";
import { Circle } from "./components/Circle/Circle";
import { Formula, LineType } from "./common/types";
import { ControlPanel } from "./components/ControlPanel/ControlPanel";
import {
  DEFAULT_DIVISIONS,
  DEFAULT_INTERVAL,
  DEFAULT_STEP,
} from "./common/constants";
import { Combos } from "./common/combos";

function App() {
  const variant = Combos[0];
  const [divisions, setDivisions] = useState(variant.divisions);
  const [formula, setFormula] = useState(variant.formula);
  const [interval, setInterval] = useState(variant.interval);
  const [lineType, setLineType] = useState(variant.lineType);
  const [isOpenFormulas, setIsOpenFormulas] = useState(false);
  const [isOpenLineTypes, setIsOpenLineTypes] = useState(false);
  const [coefficientStep, setCoefficientStep] = useState(variant.kstep);
  const [angleSpeed, setAngleSpeed] = useState(variant.anglespeed);

  return (
    <div className="app">
      <Circle
        formula={formula}
        divisions={divisions}
        interval={interval}
        lineType={lineType}
        coefficientStep={coefficientStep}
        angleSpeed={angleSpeed}
      />
      <ControlPanel
        interval={interval}
        lineType={lineType}
        divisions={divisions}
        formula={formula}
        coefficientStep={coefficientStep}
        angleSpeed={angleSpeed}
        isOpenFormulas={isOpenFormulas}
        isOpenLineTypes={isOpenLineTypes}
        onChangeLineType={(value) => setLineType(value)}
        onChangeInterval={(value) => setInterval(value)}
        onOpenFormulas={() => setIsOpenFormulas(!isOpenFormulas)}
        onOpenLineTypes={() => setIsOpenLineTypes(!isOpenLineTypes)}
        onChangeDivisions={(value) => setDivisions(value)}
        onChangeFormula={(value) => setFormula(value)}
        onChangeCoefficientStep={(value) => setCoefficientStep(value)}
        onChangeAngleSpeed={(value) => setAngleSpeed(value)}
      />
    </div>
  );
}

export default App;
