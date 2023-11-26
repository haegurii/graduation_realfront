import { setShowOverlay, setMessages } from "../store/actions";
import { store } from "../store/index";
import * as wss from "./wss";
import Peer from "simple-peer";
import { fetchTURNCredentials, getTurnIceServers } from "./turn";

// 영상 제약조건
const defaultConstraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

// onlyAudio 버튼을 체크할 때 제약조건
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null,
  onlyAudio
) => {
  await fetchTURNCredentials();

  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log("successfuly received local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);

      // flask server
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // console.time("myTimer");
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: "video/webm" });
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryData = event.target.result;
            // host -> stt, join -> 수어
            // wss.videoStream(binaryData);
            // wss.sign_language(binaryData);
            isRoomHost
              ? wss.videoStream(binaryData)
              : wss.sign_language(binaryData);
          };
          reader.readAsArrayBuffer(blob);
          chunks.length = 0;
        }
        mediaRecorder.start();
      };

      mediaRecorder.start();

      setInterval(() => {
        console.log("Sending chunks to the server");
        mediaRecorder.stop();
      }, 3000);

      // dispatch an action to hide overlay
      store.dispatch(setShowOverlay(false));

      isRoomHost
        ? wss.createNewRoom(identity, onlyAudio)
        : wss.joinRoom(identity, roomId, onlyAudio);
    })
    .catch((err) => {
      console.log(
        "error occurred when trying to get an access to local stream"
      );
      console.log(err);
    });
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  const turnIceServers = getTurnIceServers();

  if (turnIceServers) {
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        ...turnIceServers,
      ],
    };
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const messengerChannel = "messenger";

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  // peers는 객체이므로 peers[connUserSocketId]에서 connUserSocketId는 peers의 key
  peers[connUserSocketId] = new Peer({
    // 피어가 연결의 시작자인지 아닌지 여부
    initiator: isInitiator,
    // 피어 연결에 대한 구성 옵션을 보유하는 개체
    // ICE Server(stun, turn)
    config: configuration,
    // 이 피어가 공유할 로컬 미디어 스트림(비디오, 오디오)
    stream: localStream,
    // 데이터 채널의 이름을 나타내는 문자열
    // 채팅 메세지를 교환하는데 사용
    channelName: messengerChannel,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  // 피어 연결의 data 이벤트 리스너 설정
  // data 이벤트는 피어 간에 미디어가 아닌 데이터를 교환할 때 사용
  peers[connUserSocketId].on("data", (data) => {
    // 수신된 문자열을 js객체로 변환하는데 사용
    const messageData = JSON.parse(data);
    appendNewMessage(messageData);
  });
};

export const handleSignalingData = (data) => {
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.classList.add("video_track");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);

  if (store.getState().voiceCall.connectOnlyWithAudio) {
    videoContainer.appendChild(getAudioOnlyLabel());
  }

  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId) => {
  //display incoming stream
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.classList.add("video_track");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);

  // check if other user connected only with audio
  const participants = store.getState().voiceCall.participants;

  const participant = participants.find((p) => p.socketId === connUserSocketId);
  console.log(participant);
  if (participant?.onlyAudio) {
    videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
  } else {
    videoContainer.style.position = "static";
  }

  videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel = (identity = "") => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label_only_audio_container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML = `Only audio ${identity}`;

  labelContainer.appendChild(label);
  return labelContainer;
};

////////////////////////////////// Buttons logic //////////////////////////////////

export const toggleMic = (isMuted) => {
  localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
  localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
  isScreenSharingActive,
  screenSharingStream = null
) => {
  if (isScreenSharingActive) {
    switchVideoTracks(localStream);
  } else {
    switchVideoTracks(screenSharingStream);
  }
};

const switchVideoTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

////////////////////////////////// Messages /////////////////////////////////////

// Redux 저장소에 메시지 저장
const appendNewMessage = (messageData) => {
  // Redux 저장소의 messages 속성의 현재 상태를 추출
  const messages = store.getState().voiceCall.messages;
  // Redux 저장소에 액션함수 setMessages를 호출하여 액션을 생성
  // 기존 messages에 messageData를 추가하고 Redux 저장소에 상태를 업데이트 함
  store.dispatch(setMessages([...messages, messageData]));
};

// 로컬 메시지를 생성하고 메시지 저장소에 저장한 다음 같은 피어에 속한 다른 유저에게 메시지 전달
export const sendMessageUsingDataChannel = (messageContent) => {
  // append this message locally
  // 현재 identity 추출
  const identity = store.getState().voiceCall.identity;

  // 로컬 사용자가 메시지를 생성
  const localMessageData = {
    content: messageContent,
    identity,
    // 이 부분이 로컬 사용자라는 표시
    messageCreatedByMe: true,
  };

  // 메시지 저장소에 저장
  appendNewMessage(localMessageData);

  // 다른 유저에게 전달할 메시지 생성
  const messageData = {
    content: messageContent,
    identity,
  };

  // 메시지 데이터 객체를 JSON 문자열로 변환
  // WebRTC 채널은 일반적으로 데이터를 문자열로 전송하기 때문에 변환이 필수
  const stringifiedMessageData = JSON.stringify(messageData);

  // 연결된 모든 피어에게 메시지 데이터를 전송
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
};
