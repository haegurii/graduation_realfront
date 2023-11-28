import './index.css';

import testImage from '../../assets/images/test.png';

const Team = () => {
  return (
    <div className="team-grid-container">
      {members.map(({ name, mobile, email }) => (
        <div className="team-grid-item" key={name}>
          <div className="team-image-wrapper">
            <img src={testImage} alt="" />
          </div>
          <div className="team-text-wrapper">
            <h1>{name}</h1>
            <p>{mobile}</p>
            <span>{email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;

const members = [
  { name: '남우진', mobile: '010-1111-1111', email: 'skadnwls@naver.com' },
  { name: '유해동', mobile: '010-1111-1111', email: 'skadnwls@naver.com' },
  { name: '최하린', mobile: '010-1111-1111', email: 'skadnwls@naver.com' },
  { name: '장호익', mobile: '010-1111-1111', email: 'skadnwls@naver.com' },
];
