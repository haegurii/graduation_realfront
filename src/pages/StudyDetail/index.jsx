import "./index.css";

import { useLocation, useNavigate } from "react-router-dom";
import ImageContainer from "../../components/ImageContainer";
import { useMemo } from "react";
import BackButton from "../../components/BackButton/index";

const StudyDetail = () => {
  //props로 데이터 받아옴
  const location = useLocation();
  const item = location.state.item;

  const { pathname } = useLocation();

  const currentTitle = useMemo(() => {
    if (pathname.includes("consonant")) return "1단계 자음 모음 학습하기";
    if (pathname.includes("word")) return "2단계 단어 학습하기";
    return "3단계 문장 학습하기";
  }, [pathname]);

  return (
    <div>
      <ImageContainer title={currentTitle} noButton />

      <div className="study-detail-grid-container">
        <div className="study-detail-grid-item first">
          <div>
            <video src={item.video} controls></video>
          </div>
        </div>

        <div className="study-detail-grid-item second">
          <h2>수형 사진</h2>
          <div className="study-detail-image-wrapper">
            <img src={item.images[0]} alt="" />
          </div>

          <h2>수형 설명</h2>
          <span>{item.description}</span>
        </div>
      </div>

      <BackButton onClick={useNavigate(-1)} />
    </div>
  );
};

export default StudyDetail;
