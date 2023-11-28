import HeaderTitle from './HeaderTitle';

import icon01 from '../../../assets/icons/icon_01.png';
import icon02 from '../../../assets/icons/icon_02.png';
import icon03 from '../../../assets/icons/icon_03.png';
import icon04 from '../../../assets/icons/icon_04.png';
const Tech = () => {
  return (
    <div className="tech">
      <HeaderTitle
        title="Tech Stack"
        subTitle="Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
      />

      <div className="techs">
        <div className="member-card">
        <div className="tech-profile">
            <img src={icon01} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">Strategy</div>
            <div className="member-mobile">
              수어를 단어별로 학습하며, 수어 번역을 이용해서 통화를 할 수
              있습니다.
            </div>
          </div>
        </div>

        <div className="member-card">
        <div className="tech-profile">
            <img src={icon02} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">Design</div>
            <div className="member-mobile">React</div>
          </div>
        </div>

        <div className="member-card">
        <div className="tech-profile">
            <img src={icon03} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">Development</div>
            <div className="member-mobile">
              더 많은 단어를 학습시키고 속도면에서 업그레이드 합니다
            </div>
          </div>
        </div>

        <div className="member-card">
        <div className="tech-profile">
            <img src={icon04} alt="" />
          </div>
          <div className="member-text">
            <div className="member-name">Term</div>
            <div className="member-mobile">2023.09 - 2023.12</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;