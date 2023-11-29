import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import HeaderTitle from "./HeaderTitle";
import woozin from "../../../assets/images/woozin.png";
import haedong from "../../../assets/images/haedong.png";
import harin from "../../../assets/images/harin.png";
import hoik from "../../../assets/images/hoik.png";

const Teams = () => {
  return (
    <div className="teams">
      <HeaderTitle
        title="팀 소개"
        subTitle="플랫폼 개발에 함께한 팀원을 소개합니다."
      />

      <div className="members">
        <div className="member-card">
          <div className="member-profile">
            <img src={woozin} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">남우진</div>
            <div className="member-email">역할 - Backend</div>
            <div className="member-mobile">010-2541-5324</div>

            <div className="member-email">skadnwls2@naver.com</div>
          </div>
        </div>

        <div className="member-card">
          <div className="member-profile">
            <img src={haedong} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">유해동</div>
            <div className="member-email">역할 - Backend</div>
            <div className="member-mobile">010-2911-7523</div>
            <div className="member-email">yoohaedong3@gmail.com</div>
          </div>
        </div>

        <div className="member-card">
          <div className="member-profile">
            <img src={hoik} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">장호익</div>
            <div className="member-email">역할 - Frontend</div>
            <div className="member-mobile">010-9991-6687</div>
            <div className="member-email">wkdghdlr1@naver.com</div>
          </div>
        </div>

        <div className="member-card">
          <div className="member-profile">
            <img src={harin} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">최하린</div>
            <div className="member-email">역할 - AI</div>
            <div className="member-mobile">010-7636-3226</div>
            <div className="member-email">choihalin@naver.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
