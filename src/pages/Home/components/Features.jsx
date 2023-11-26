import { Link } from 'react-router-dom';
import callImage from '../../../assets/images/call.png';
import studyImage from '../../../assets/images/study.jpg';
import Button from '../../../components/Button';
import HeaderTitle from './HeaderTitle';

import { useEffect, useRef } from 'react';
import Tech from './Tech';

const Features = () => {

  const targetRef = useRef(null);

  const handleIntersect = (entries, observer) => {
    if (targetRef.current) {
      if (entries[0].isIntersecting) {
        targetRef.current.style.opacity = 1;
        observer.unobserve(entries[0].target);
      }
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
  }, []);

  return (
    <div className="features" ref={targetRef}>
      <HeaderTitle
        title="기능 소개"
        subTitle="수어를 사용하여 통화를 하거나, 단어를 검색하여 수화를 학습해 보아요!"
      />

      <div className="features-grid-container">
        <div className="features-grid-item">
        <div className="features-image-wrapper hover-scale">
            <img src={callImage} alt="이미지" />
          </div>
        </div>
        <div className="features-grid-item">
          <div>
            <h3>실시간 수화 번역을 이용한 통화 기능</h3>
            <Link to="/live-call">
              <Button />
            </Link>
          </div>
        </div>
        <div className="features-grid-item">
          <div>
            <h3>수화 학습 기능</h3>
            <Link to="/study">
              <Button />
            </Link>
          </div>
        </div>
        <div className="features-grid-item">
          <div className="features-image-wrapper hover-scale">
            <img src={studyImage} alt="이미지" />
          </div>
        </div>
        {/* <div className="features-grid-item">
          <div className="features-image-wrapper hover-scale">
            <img src={studyImage} alt="이미지" />
          </div>
        </div> */}
        {/* <div className="features-grid-item">
          <div>
            <h3>친구 관리 기능</h3>
            <Link to="">
              <Button />
            </Link>
          </div>
        </div> */}
      </div>

      <Tech />
    </div>
  );
};

export default Features;
