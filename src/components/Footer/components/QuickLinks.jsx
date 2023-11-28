import IconStudy from "../../../assets/icons/icon_study.svg";
import IconTeam from "../../../assets/icons/icon_team.svg";
import IconLivecall from "../../../assets/icons/icon_livecall.svg";
import { Link } from 'react-router-dom';
const QuickLinks = () => {
  return (
    <div>
      <h1 className="title">Quick Links</h1>
      <div className="quick-links">
        
        <div>
        <Link to="/live-call">
          <img src={IconLivecall} />
          {/* <IconLivecall /> */}
          </Link>
          <div>
            <h2>실시간 통화하기</h2>
            <p>실시간으로 친구와 통화하면서 수어를 학습해 보아요.</p>
          </div>
        </div>
        
        <div>
          <Link to="/study">
          <img src={IconStudy} />
          </Link>
          {/* <IconStudy /> */}
          <div>
            <h2>수어 단계별 학습하기</h2>
            <p>수어를 단계별로 학습해서 수어를 능숙하게 익혀보아요.</p>
          </div>
        </div>
        {/* <div>
          <img src={IconTeam} />
         
          <div>
            <h2>팀 소개</h2>
            <p>팀 구성원을 소개합니다.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QuickLinks;
