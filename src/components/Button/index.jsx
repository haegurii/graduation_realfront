import "./index.css";

const Button = ({ text = "바로 가기", onClick }) => {
  return (
    <button className="button-component" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
