import './index.css';

import ImageContainer from '../../components/ImageContainer';
import call_together from '../../assets/images/call_together.png';
import { useNavigate } from 'react-router-dom';

const LiveCall = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="header-title">
        <div>
          <p>실시간으로 수어를 번역하면서 통화를 할 수 있어요!</p>
          <h1>실시간 수화 번역 기능</h1>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item first">
          <h2>동작 및 기능 설명</h2>
          <div className="center">
          <span>친구와 통화를 하면서 다양한 기능들을 사용해 보아요!</span>
          </div>
          <div>
            <img src={call_together} alt="" />
            
          </div>
        </div>

        <div className="grid-item second">
          <ul>
            {list.map(content => (
              <li key={content.id}>
                <span>{content.id}</span>
                <div>
                  <h3>{content.title}</h3>
                  <p>{content.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ImageContainer
        title="실시간 통화 시작하기"
        onClick={() => navigate('/live-call/login')}
      />
    </main>
  );
};

export default LiveCall;

const list = [
  {
    id: 1,
    title: '화면을 향해 수어를 해보세요',
    detail:
      '실시간으로 수어가 번역이 진행되며, 번역된 수어들이 화면에 출력됩니다.',
  },
  {
    id: 2,
    title: '마이크로 대화하기',
    detail:
      '마이크로 말을 한다면 실시간으로 음성들이 텍스트로 채팅방에 출력됩니다.',
  },
  {
    id: 3,
    title: '화면 공유하기',
    detail:
      '화면 공유기능을 통해 화면을 공유할 수 있고, 화면공유가 시작되면 모니터 화면 하단에 화면이 표시됩니다.',
  },
  {
    id: 4,
    title: '통화 예의범절 지키기',
    detail:
      '상대방을 비방한다거나 욕설을 하는 행위는 자제해주세요.',
  }

];
