import io from "socket.io-client";
import {
  setRoomId,
  setParticipants,
  setSocketId,
  setSttMessage,
  setSignLanguageMessage,
} from "../store/actions";
import { store } from "../store/index";
import * as webRTCHandler from "./webRTCHandler";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;
const SERVER = API_KEY + ":4000";
// const FLASK_SERVER = "http://127.0.0.1:5000";
const FLASK_SERVER = API_KEY + ":5000";

let socket = null;
let socket_flask = null;
let signMessage = "";
let idx = 0;
export const connectWithSocketIOServer = () => {
  socket = io(SERVER);
  socket_flask = io(FLASK_SERVER);

  // flask
  socket_flask.on("connect", () => {
    console.log("successfully connected with socket flask io server");
  });

  socket_flask.on("transcriptionResult", (transcription) => {
    // Handle the received transcription data
    console.log("Transcription:", transcription);
    store.dispatch(setSttMessage(transcription));
  });

  socket_flask.on("sign_language_translation", (translation) => {
    console.log("sign_language_translation:", translation);
    if (idx === 6) {
      signMessage = "";
      idx = 0;
    }
    signMessage += translation + " ";
    store.dispatch(setSignLanguageMessage(signMessage));
    idx += 1;
  });

  socket.on("connect", () => {
    console.log("successfully connected with socket express io server");
    console.log(socket.id);
    store.dispatch(setSocketId(socket.id));
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // inform the user which just join the room that we have prepared for incoming connection
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
};

export const createNewRoom = (identity, onlyAudio) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    onlyAudio,
  };

  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    onlyAudio,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const videoStream = (binaryData) => {
  socket_flask.emit("videoStream", binaryData);
};

export const sign_language = (binaryData) => {
  socket_flask.emit("sign_language", binaryData);
};
