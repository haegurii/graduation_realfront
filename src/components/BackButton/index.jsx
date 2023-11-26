import './index.css';
import { ReactComponent as IconBack } from '../../assets/icons/icon_back.svg';
import { useNavigate } from "react-router-dom";


const BackButton = ({ text = "뒤로" }) => {
  const navigate = useNavigate();

 const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <button className="back-button-component" onClick={onClickBtn}>
      <IconBack width={20} height={20} fill="#3563e9" /> {text}
    </button>
  );
};

export default BackButton;