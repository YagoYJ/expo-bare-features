import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";

export async function getTodos() {
  const { data: response } = await api.get("todos", {
    headers: {
      username: await AsyncStorage.getItem("@username"),
    },
  });

  return response;
}
