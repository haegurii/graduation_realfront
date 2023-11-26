import { useEffect } from "react";
import ChatSection from "./components/ChatSection/ChatSection";
import ParticipantsSection from "./components/ParticipantsSection/ParticipantsSection";
import VideoSection from "./components/VideoSection/VideoSection";
import RoomLabel from "./components/RoomLabel";
import { connect } from "react-redux";
import * as webRTCHandler from "../../utils/webRTCHandler";
import Overlay from "./components/Overlay";

import "./index.css";

const LiveCallConnect = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
  connectOnlyWithAudio,
}) => {
  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
    } else {
      webRTCHandler.getLocalPreviewAndInitRoomConnection(
        isRoomHost,
        identity,
        roomId,
        connectOnlyWithAudio
      );
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.voiceCall,
  };
};

export default connect(mapStoreStateToProps)(LiveCallConnect);
