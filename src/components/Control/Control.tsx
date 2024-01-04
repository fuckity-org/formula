import cn from "classnames";
import css from "./Control.module.scss";

interface IControlProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export function Control({
  label,
  className,
  type = "number",
  ...props
}: IControlProps) {
  return (
    <label className={cn(css.control, className)}>
      <span className={css.label}>{label}</span>
      <input className={css.input} type={type} {...props} />
    </label>
  );
}
