import "./index.css";

interface IButtonProps {
  title: string;
  classes: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ title, classes, disabled, onClick }) => {
  return (
    <div role="button" className={`btn ${disabled ? "disabled" : ""} ${classes}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
