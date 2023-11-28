import Actions from "./actions";

// Redux에서 reducer는 Redux 저장소로 전송된 작업에 대한 응답으로 애플리케이션의 상태가 어떻게 변경되는지 지정하는 함수입니다. 
// 현재 상태와 작업을 인수로 사용하고 새 상태를 반환합니다.

// Redux 저장소의 초기 상태로, 애플리케이션이 시작될 때의 상태를 정의
const initState = {
  // 참가자 이름
  identity: "",
  // 호스트 여부
  isRoomHost: false,
  // 오디오만 연결된 지 여부
  connectOnlyWithAudio: false,
  // 룸 id
  roomId: null,
  // 연결되기전에 나오는 overlay
  showOverlay: true,
  // 참여자를 저장하는 배열
  participants: [],
  // 메시지를 저장하는 배열
  messages: [],
  activeConversation: null,
  directChatHistory: [],
  // 소켓 id
  socketId: null
};

// state는 현재 상태를 나타내고
// action은 수행 중인 작업 유형을 설명하는 유형 속성이 있는 개체
const reducer = (state = initState, action) => {
  // 각각의 경우마다 새로운 상태 객체가 반환
  // Redux의 기본 개념인 불변성을 보장하려면 새로운 상태 객체를 생성하는 것이 중요
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.isRoomHost,
      };
    case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.onlyWithAudio,
      };
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.identity,
      };
    case Actions.SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.showOverlay,
      };
    case Actions.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.participants,
      };
    case Actions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case Actions.SET_ACTIVE_CONVERSATION:
      return {
        ...state,
        activeConversation: action.activeConversation
      }
    case Actions.SET_DIRECT_CHAT_HISTORY:
      return {
        ...state,
        directChatHistory: action.directChatHistory
      };
    case Actions.SET_SOCKET_ID:
      return {
        identity: "",
        isRoomHost: false,
        connectOnlyWithAudio: false,
        roomId: null,
        showOverlay: true,
        participants: [],
        messages: [],
        activeConversation: null,
        directChatHistory: [],
        socketId: action.socketId
      }
    default:
      return state;
  }
};

export default reducer;
