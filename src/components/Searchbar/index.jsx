import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";

const Searchbar = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  return (
    <div className="searchbar-container">
      <h1>결과 내 검색</h1>
      <form
        id="searchbar"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`?search=${value}`);
        }}
      >
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <button
        form="searchbar"
        onClick={(e) => {
          e.preventDefault();
          navigate(`?search=${value}`);
        }}
      >
        검색
      </button>
    </div>
  );
};

export default Searchbar;
