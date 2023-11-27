import { useNavigate } from "react-router-dom";

const ContentList = ({ type, list }) => {
  const navigate = useNavigate();

  return (
    <div className="study-content-list">
      {list?.map((item, index) => (
        <div
          key={index}
          className="study-content-item"
          onClick={() => navigate(`./${item.id}`, { state: { item: item } })}
        >
          <div className="study-image-wrapper">
            <img
              className="study-content-image"
              src={item.images[0]}
              alt="img"
            />
          </div>
          <h1 className="study-content-title">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
