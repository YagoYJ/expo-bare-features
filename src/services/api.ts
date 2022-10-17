import axios from "axios";

const api = axios.create({
  baseURL: "https://37df-2804-248-ef64-7b00-9de-73d5-584-eff2.ngrok.io",
  headers: { accept: "application/json" },
});

export { api };
