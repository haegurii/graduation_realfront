import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as IconSearch } from "../../../assets/icons/icon_search.svg";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunkFunctions";
import { useState } from "react";

const routes = [
  { to: "/login", name: "Login", auth: false },
  { to: "/sign-up", name: "SignUp", auth: false },
  { to: "", name: "Logout", auth: true },
];

const HeaderRight = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="right">
      <form
        id="searchbar"
        className="search-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search-result?search=${search}`);
        }}
      >
        <IconSearch />
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="button-group">
        {routes.map(({ to, name, auth }) => {
          if (isAuth !== auth) return null;
          if (name === "Logout") {
            return (
              <Link key={name} onClick={handleLogout}>
                <button className="Login">{name}</button>
              </Link>
            );
          } else {
            return (
              <Link key={name} to={to}>
                <button className={name}>{name}</button>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HeaderRight;
