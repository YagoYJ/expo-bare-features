import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let username = "";
async () => {
  username = await AsyncStorage.getItem("@username");
};

const api = axios.create({
  headers: {
    username,
  },
  baseURL: "http://192.168.18.5:3333",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async () => {
    AsyncStorage.clear();
    // Updates.reloadAsync()
  }
);

export { api };
