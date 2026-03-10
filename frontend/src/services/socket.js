import { io } from "socket.io-client";

const socket = io("https://campus-air.onrender.com", {
  withCredentials: true
});

export default socket;