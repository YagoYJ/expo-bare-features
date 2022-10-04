import axios from "axios";

const api = axios.create({
  baseURL: "https://1de8-2804-248-ef3f-7100-3179-143a-e96f-559f.ngrok.io",
  headers: { accept: "application/json" },
});

export { api };
