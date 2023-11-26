const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_IDENTITY: "SET_IDENTITY",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_SHOW_OVERLAY: "SET_SHOW_OVERLAY",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  SET_MESSAGES: "SET_MESSAGES",
  SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
  SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
  SET_SOCKET_ID: "SET_SOCKET_ID",
  SET_STT_MESSAGE: "SET_STT_MESSAGE",
  SET_SIGN_LANGUAGE_MESSAGE: "SET_SIGN_LANGUAGE_MESSAGE",
};

// 밑에 있는 함수 전부 액션 생성자(action creators)

// 호출되면 SET_IS_ROOM_HOST 유형의 Redux 작업을 반환
export const setIsRoomHost = (isRoomHost) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    onlyWithAudio,
  };
};

export const setIdentity = (identity) => {
  return {
    type: Actions.SET_IDENTITY,
    identity,
  };
};

export const setRoomId = (roomId) => {
  return {
    type: Actions.SET_ROOM_ID,
    roomId,
  };
};

export const setShowOverlay = (showOverlay) => {
  return {
    type: Actions.SET_SHOW_OVERLAY,
    showOverlay,
  };
};

export const setParticipants = (participants) => {
  return {
    type: Actions.SET_PARTICIPANTS,
    participants,
  };
};
// 액션 객체를 반환
export const setMessages = (messages) => {
  return {
    // 작업 유형을 나타내는 문자열
    type: Actions.SET_MESSAGES,
    // 상태를 업데이트 하려는 새 메시지 데이터 또는 배열
    messages,
  };
};

export const setActiveConversation = (activeConversation) => {
  return {
    type: Actions.SET_ACTIVE_CONVERSATION,
    activeConversation,
  };
};

export const setDirectChatHistory = (directChatHistory) => {
  return {
    type: Actions.SET_DIRECT_CHAT_HISTORY,
    directChatHistory,
  };
};

export const setSocketId = (socketId) => {
  return {
    type: Actions.SET_SOCKET_ID,
    socketId,
  };
};

export const setSttMessage = (sttMessage) => {
  return {
    type: Actions.SET_STT_MESSAGE,
    sttMessage,
  };
};

export const setSignLanguageMessage = (signLanguageMessage) => {
  return {
    type: Actions.SET_SIGN_LANGUAGE_MESSAGE,
    signLanguageMessage,
  };
};

export default Actions;
