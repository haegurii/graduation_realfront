import { useEffect, useRef } from 'react';
import HeaderTitle from './HeaderTitle';

import meanImage from '../../../assets/images/mean.png';
import image01 from '../../../assets/images/image_01.png';
import image02 from '../../../assets/images/image_02.jpeg';

const SignLanguage = () => {
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
    <div className="sign-language" ref={targetRef}>

      <div className="sign-title">
        <h1>
          View our works below to
          <br />
          understand our sign language.
        </h1>
        <h2>
          우리의 수화를 알고싶다면 아래에서 우리의 작품을 보세요!
        </h2>
      </div>


      <HeaderTitle
        title="수어의 의미"
        subTitle="아름다운 언어, 수어의 의미는?"
      />

      <div className="sign-content">
        <div className="image-wrapper hover-scale">
          <img src={meanImage} alt="이미지" />
        </div>

        <div>
          <h3>
            청각장애인들은 소리로 말을 배울 수 없어서 ‘보이는 언어’를
            사용합니다.
            <br />이 ‘보이는 언어’가 바로 ‘수어 (手語, Sign language)’입니다.
          </h3>
          <br></br>
          <h3>
            ‘한국수화언어법’에 따르면 ‘한국수어’는 ‘한국수화언어’를 줄인 말로,
            <br />
            한국어나 영어처럼 독립된 언어라는 의미를 담고 있습니다.
          </h3>
          {/* <p>Courtney Henry -Marketing Coordinator</p> */}
        </div>
      </div>

      <div className="features-grid-container">
        <div className="features-grid-item">
          <div className="features-image-wrapper hover-scale">
            <img src={image01} alt="이미지" />
          </div>
        </div>
        <div className="features-grid-item">
          <div>
            <h3>수어와 몸짓(제스처)의 차이</h3>
            <p>
              수어는 단순한 몸짓과는 전혀 다르며, 수어는 손과 손가락의 모양,
              손바닥의 방향, 손의 위치, 손의 움직임 등에 따라 의미가 달라집니다.
              또한 같은 동작을 하더라도 어떤 표정을 짓느냐에 따라 다른 의미가
              됩니다.
            </p>
          </div>
        </div>
        <div className="features-grid-item">
          <div>
            <h3>한글지문자(한글指文字)</h3>
            <p>
              한국 수어(韓國手語, 영어: Korean Sign Language)는 수화의 종류 중
              하나이며, 한국어와 함께 대한민국의 공용어로 지정되었습니다. 단어로
              표현을 못하는 것은 한글 지문자로 나타냅니다.
            </p>
            <br />

            <span>
              * 지문자 : 청각장애인과 의사소통을 할 때 손과 손가락으로 한글의
              자음과 모음을 표현하는 문자
            </span>
          </div>
        </div>
        <div className="features-grid-item">
          <div className="features-image-wrapper hover-scale">
            <img src={image02} alt="이미지"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignLanguage;
