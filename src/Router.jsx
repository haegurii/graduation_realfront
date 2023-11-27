import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import LiveCallConnect from "./pages/LiveCallConnect";
import LiveCallLogin from "./pages/LiveCallLogin";
import LiveCallJoinRoom from "./pages/LiveCallJoinRoom";
import ProtectedPage from "./pages/Admin";
import Home from "./pages/Home";
import LiveCall from "./pages/LiveCall";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Study from "./pages/Study";
import StudyConsonant from "./pages/StudyConsonant";
import StudyDetail from "./pages/StudyDetail";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import NotAuthRoutes from "./components/Routes/NotAuthRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { authUser } from "./store/thunkFunctions";
import SearchResult from "./pages/SearchResult/index";

const Router = () => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showFooter = useMemo(() => {
    if (location.pathname.includes("connect")) return false;
    return true;
  }, [location]);

  return (
    <>
      {showFooter && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />,
        <Route path="/home" element={<Home />} />
        <Route path="/live-call" element={<LiveCall />} />
        <Route path="/study" element={<Study />} />
        <Route path="/study/:type/:pageUrl" element={<StudyConsonant />} />
        <Route path="/study/:type/:page/:id" element={<StudyDetail />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/search-result/:id" element={<StudyDetail />} />
        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/live-call/login" element={<LiveCallLogin />} />
          <Route path="/protected" element={<ProtectedPage />}></Route>
          <Route path="/live-call/connect" element={<LiveCallConnect />} />
          <Route
            path="/live-call/join-room/:host?"
            element={<LiveCallJoinRoom />}
          />
        </Route>
        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

export default Router;
