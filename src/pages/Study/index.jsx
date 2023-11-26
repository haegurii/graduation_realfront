import "./index.css";
import word from "../../assets/images/word.png";
import consonant from "../../assets/images/consonant.png";
import sentence from "../../assets/images/sentence.png";
import { useNavigate } from "react-router-dom";

const Study = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header-title">
        <div>
          <p>단계별로 수화를 학습해 보아요!</p>
          <h1>수화 학습 기능</h1>
        </div>
      </div>

      <div className="list-container">
        <div
          className="item hover-scale"
          onClick={() => navigate("/study/consonant/1")}
        >
          <img src={consonant} alt="" />
          <h2>1단계 자음 모음 학습</h2>
        </div>

        <div
          className="item hover-scale"
          onClick={() => navigate("/study/word/1")}
        >
          <img src={word} alt="" />
          <h2>2단계 단어 학습</h2>
        </div>

        <div
          className="item hover-scale"
          onClick={() => navigate("/study/sentence/1")}
        >
          <img src={sentence} alt="" />
          <h2>3단계 문장 학습</h2>
        </div>
      </div>
    </div>
  );
};

export default Study;
