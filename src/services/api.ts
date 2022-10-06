import axios from "axios";

const api = axios.create({
  baseURL: "https://5671-2804-248-efa8-2400-18d0-c60e-e48f-afcf.ngrok.io",
  headers: { accept: "application/json" },
});

export { api };
