import { Global } from '../../constants';
import './button.css';

export interface ButtonProps {
  primary?: boolean;
  dark?: boolean;
  label: string;
  onClick?: () => void;
}

export default function Button({
  primary = false,
  dark = false,
  label,
  ...props
}: ButtonProps) {
  const mode = primary
    ? `${Global.PackageName}-button--primary`
    : `${Global.PackageName}-button--secondary`;

  const accent = dark
    ? `${Global.PackageName}-button--dark`
    : `${Global.PackageName}-button--light`;

  return (
    <button
      type="button"
      className={[
        `${Global.PackageName}-button`,
        mode,
        accent
      ].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
