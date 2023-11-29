const HeaderTitle = ({ title, subTitle, subTitle1 }) => {
  return (
    <div className="title-wrapper">
      <h1 className="title">{title}</h1>
      <h2 className="sub-title">{subTitle}</h2>
      <br />
      <h2 className="sub-title">{subTitle1}</h2>
    </div>
  );
};

export default HeaderTitle;
