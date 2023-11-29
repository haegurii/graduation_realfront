import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";

const ConnectingButtons = () => {
  let navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/live-call/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/live-call/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="방 들어가기"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        createRoomButton
        buttonText="방 만들기"
        onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
