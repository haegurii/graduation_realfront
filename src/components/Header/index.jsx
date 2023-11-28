import './index.css';

import Logo from '../Logo';
import HeaderNav from './components/HeaderNav';
import HeaderRight from './components/HeaderRight';

const Header = () => {
  return (
    <header>
      <Logo />
      <HeaderNav />
      <HeaderRight />
    </header>
  );
};

export default Header;
