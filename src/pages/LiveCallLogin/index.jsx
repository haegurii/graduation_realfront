import { useEffect } from "react";
import ConnectingButtons from "./components/ConnectingButtons";
import { connect } from "react-redux";
import { setIsRoomHost } from "../../store/actions";

import "./index.css";

const LiveCallLogin = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    // 현재 사용자가 방의 host가 아니라고 설정
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <ConnectingButtons />
      </div>
    </div>
  );
};

// dispatch 기능은 Redux store에 의해 제공되고, 작업을 전달하는데 사용함
// action creator를 컴포넌트 props에 매핑할 수 있음
const mapActionsToProps = (dispatch) => {
  return {
    // setIsRoomHost 액션이 전달되면, 호스트 상태가 변경되었다고 Redux Store에 알림
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};
// React 구성 요소를 Redux 저장소에 연결
// 저장소의 상태가 필요하지 않아 null
// mapActionsToProps -> 저장소에 작업을 전달하기 위해 사용
export default connect(null, mapActionsToProps)(LiveCallLogin);
