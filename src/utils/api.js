import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY;

// const serverApi = "http://localhost:5002/api";
// const serverApi = "http://172.16.104.219:5002/api";
// const serverApi = "http://192.168.219.100:4000/api";

const serverApi = API_KEY + ":4000/api";
console.log(serverApi);

export const getRoomExists = async (roomId) => {
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};

export const getTURNCredentials = async () => {
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
};
