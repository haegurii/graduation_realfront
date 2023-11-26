import { useState } from "react";
import SendMessageButton from "../../../../assets/images/sendMessageButton.svg";
import * as webRTCHandler from "../../../../utils/webRTCHandler";
import { connect } from "react-redux";
import { setSttMessage } from "../../../../store/actions";
import { setSignLanguageMessage } from "../../../../store/actions";

const NewMessage = ({
  sttMessage,
  signLanguageMessage,
  setSttMessageAction,
  setSignLanguageMessageAction,
}) => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    console.log("messagetest----------------");
    if (sttMessage !== "") {
      event.target.value = sttMessage;
      setSttMessageAction("");
    }
    if (signLanguageMessage !== "") {
      event.target.value = signLanguageMessage;
      setSignLanguageMessageAction("");
    }
    // 메시지 입력값을 현재 입력값으로 변경
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      // 엔터를 눌렀을 때 input 태그가 작동하지 않게 방지하고
      event.preventDefault();

      // send message to other users
      // input 태그가 sendMessage()를 실행시키게 만듬
      sendMessage();
    }
  };

  const sendMessage = () => {
    // 메시지가 공백이 아닐 경우
    if (message.length > 0) {
      // 메세지 전송
      webRTCHandler.sendMessageUsingDataChannel(message);

      // 현재 메시지 박스를 공백으로 초기화
      setMessage("");
    }
  };

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message ..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.voiceCall,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setSttMessageAction: (sttMessage) => dispatch(setSttMessage(sttMessage)),
    setSignLanguageMessageAction: (signLanguageMessage) =>
      dispatch(setSignLanguageMessage(signLanguageMessage)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(NewMessage);
