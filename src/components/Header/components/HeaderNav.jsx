import { Link } from 'react-router-dom';

const HeaderNav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">홈</Link>
        </li>
        <li>
          <Link to="/live-call">통화하기</Link>
        </li>
        <li>
          <Link to="/study">학습하기</Link>
        </li>
     
      </ul>
    </nav>
  );
};

export default HeaderNav;
