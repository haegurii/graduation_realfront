import { connect } from "react-redux";

const Message = ({ author, content, sameAuthor, messageCreatedByMe }) => {
  // 이 부분은 message_container에 css를 적용하기 위한 부분
  // 메시지를 적용 사용자가 자기 자신이면 right 아니면 left
  const alignClass = messageCreatedByMe
    ? "message_align_right"
    : "message_align_left";

  // 자기 자신이면 you 그렇지 않으면 상대방 이름
  const authorText = messageCreatedByMe ? "You" : author;

  // 이 부분은 message_content에 css를 적용하기 위한 부분
  const contentAdditionalStyles = messageCreatedByMe
    ? "message_right_styles"
    : "message_left_styles";

  return (
    <div className={`message_container ${alignClass}`}>
      {/* 이전 사용자가 자기 자신이 아니라면 상대방 이름이 채팅창에 나옴*/}
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content ${contentAdditionalStyles}`}>{content}</p>
    </div>
  );
};

const Messages = ({ messages }) => {
  return (
    <div className="messages_container">
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;

        return (
          <Message
            // 메시지가 똑같은 내용일때 index로 구분
            key={`${message.content}${index}`}
            // 메시지를 적은 사용자 이름
            author={message.identity}
            content={message.content}
            // 이전 메시지가 동일한 사용자인지 확인
            // 동일한 사용자라면 true 아니면 false
            sameAuthor={sameAuthor}
            // 메시지를 적은 사용자가 자기 자신이면 true,
            // 다른 사용자 이름이면 false
            messageCreatedByMe={message.messageCreatedByMe}
          />
        );
      })}
    </div>
  );
};
// 컴포넌트를 Redux Store에 연결할때, 연결된 컴포넌트는 Redux 상태의 모든 속성을 props로 받게 됨
const mapStoreStateToProps = (state) => {
  return {
    ...state.voiceCall,
  };
};

// Redux 상태의 props를 Messages 컴포넌트에 주입
// Messages 컴포넌트는 Redux Store의 messages를 사용함
export default connect(mapStoreStateToProps)(Messages);
