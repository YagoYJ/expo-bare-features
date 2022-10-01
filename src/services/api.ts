import axios from "axios";

const api = axios.create({
  baseURL: "https://3fc5-2804-248-efff-9b00-ccfb-7190-c565-f951.ngrok.io/",
  headers: { accept: "application/json" },
});

export { api };
