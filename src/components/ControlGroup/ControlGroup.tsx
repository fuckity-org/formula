import css from "./ControlGroup.module.scss";
import React from "react";

interface IControlGroupProps extends React.PropsWithChildren {
  className?: string;
  name: string;
  onClick: () => void;
}

export function ControlGroup({ name, onClick, children }: IControlGroupProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className={css.controlGroup}>
      <div
        className={css.openButton}
        onClick={() => {
          setIsOpen(!isOpen);
          onClick();
        }}
      >
        <label>{name}</label>
        <label>{isOpen ? "^" : "˅"}</label>
      </div>
      {children}
    </div>
  );
}
