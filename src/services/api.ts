import axios from "axios";

const api = axios.create({
  baseURL: "https://746e-201-148-120-170.ngrok.io/",
  headers: { accept: "application/json" },
});

export { api };
